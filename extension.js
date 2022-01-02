const { stringify } = require('querystring');
const vscode = require('vscode');

let pending_selections = [];

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Octopus cursors has been activated.');

	let disposable1 = vscode.commands.registerCommand('octopus_writer.captureCursor', function () {
		let active_editor = vscode.window.activeTextEditor
		const anchor_pos = active_editor.selection.anchor
		const active_pos = active_editor.selection.active
		vscode.window.showInformationMessage('Captured Cursor!');
		pending_selections.push(new vscode.Selection(anchor_pos, active_pos))
	});
	let disposable2 = vscode.commands.registerCommand('octopus_writer.actiavteCursors', function () {
		pending_selections.unshift(vscode.window.activeTextEditor.selection) 
		vscode.window.activeTextEditor.selections = pending_selections
		pending_selections = []
	});
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
}
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

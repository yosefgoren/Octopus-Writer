const { stringify } = require('querystring');
const vscode = require('vscode');

let pending_selections = [];

function pos2str(position){
	return "line: "+position.line+", character: "+position.character
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Octopus cursors has been activated.');

	let disposable1 = vscode.commands.registerCommand('octopus_writer.captureCursors', function () {
		let active_editor = vscode.window.activeTextEditor
		num_cursors = active_editor.selections.length
		for(selection_idx = 0; selection_idx < num_cursors; ++selection_idx){
			const anchor_pos = active_editor.selections[selection_idx].anchor
			const active_pos = active_editor.selections[selection_idx].active
			pending_selections.push(new vscode.Selection(anchor_pos, active_pos))
		}
		if(num_cursors == 1){
			vscode.window.showInformationMessage('Captured Cursor.');
		}
		if(num_cursors > 1){
			vscode.window.showInformationMessage('Captured '+num_cursors.toString()+' Cursors.');
		}
	});
	let disposable2 = vscode.commands.registerCommand('octopus_writer.actiavteCursors', function () {
		// pending_selections.unshift(vscode.window.activeTextEditor.selection) 
		//vscode.window.activeTextEditor.selections = pending_selections
		active_editor = vscode.window.activeTextEditor
		active_editor.selections = active_editor.selections.concat(pending_selections)
		pending_selections = []
	});
	let disposable3 = vscode.commands.registerCommand('octopus_writer.popCursor', function () {
		vscode.window.activeTextEditor.selection = pending_selections.pop()
	});
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

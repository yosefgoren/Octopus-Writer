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
	console.log('Octopus Writer has been activated.');

	let disposable1 = vscode.commands.registerCommand('octopus_writer.captureSelections', function () {
		let active_editor = vscode.window.activeTextEditor
		num_cursors = active_editor.selections.length
		for(selection_idx = 0; selection_idx < num_cursors; ++selection_idx){
			const anchor_pos = active_editor.selections[selection_idx].anchor
			const active_pos = active_editor.selections[selection_idx].active
			pending_selections.push(new vscode.Selection(anchor_pos, active_pos))
		}
		if(num_cursors == 1){
			vscode.window.showInformationMessage('Captured Selection.');
		}
		if(num_cursors > 1){
			vscode.window.showInformationMessage('Captured '+num_cursors.toString()+' Selections.');
		}
	});
	let disposable2 = vscode.commands.registerCommand('octopus_writer.actiavteSelections', function () {
		// pending_selections.unshift(vscode.window.activeTextEditor.selection) 
		//vscode.window.activeTextEditor.selections = pending_selections
		active_editor = vscode.window.activeTextEditor
		active_editor.selections = active_editor.selections.concat(pending_selections)
		pending_selections = []
	});
	let disposable3 = vscode.commands.registerCommand('octopus_writer.popSelection', function () {
		vscode.window.activeTextEditor.selection = pending_selections.pop()
	});
	let disposable4 = vscode.commands.registerCommand('octopus_writer.throwCaptured', function () {
		pending_selections = []
	});
	let disposable5 = vscode.commands.registerCommand('octopus_writer.enumerateSelections', function () {
		editor = vscode.window.activeTextEditor
		editor.edit(function (edit) {
			for(selection_idx = 0; selection_idx < editor.selections.length; ++selection_idx){
				const sel = editor.selections[selection_idx]
				const range = new vscode.Range(sel.start, sel.end)
				edit.replace(range, selection_idx.toString())
			}
		})
	});
	let disposable6 = vscode.commands.registerCommand('octopus_writer.evaluateSelections', function () {
		editor = vscode.window.activeTextEditor
		vscode.window.showInformationMessage('Evaluating '+editor.selections.length.toString()+' Selections.');
		editor.edit(function (edit) {
			for(selection_idx = 0; selection_idx < editor.selections.length; ++selection_idx){
				const sel = editor.selections[selection_idx]
				const range = new vscode.Range(sel.start, sel.end)
				text = editor.document.getText(range)
				//vscode.window.showInformationMessage('text: '+text);
				try{
					new_text = eval(text).toString()
					edit.replace(range, new_text.toString())
				} catch (err) {
					vscode.window.showInformationMessage('could not print evaluation of \''+text+'\'');
				}
				//vscode.window.showInformationMessage('next: '+new_text);
			}
		})
	});
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
	context.subscriptions.push(disposable4);
	context.subscriptions.push(disposable5);
	context.subscriptions.push(disposable6);
}
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

'use strict';
const vscode = require("vscode");
const humanTyper_1 = require("./humanTyper");
let typewriterBuffer;
function activate(context) {
    let playTypewriterCmd = vscode.commands.registerCommand('typewriter.playback', () => {
        let minSpeed = vscode.workspace.getConfiguration('typewriter').get('TypingMinSpeed') | 30;
        let maxSpeed = vscode.workspace.getConfiguration('typewriter').get('TypingMaxSpeed') | 120;
        humanTyper_1.type(typewriterBuffer, minSpeed, maxSpeed);
    });
    let playTypewriterClipboardCmd = vscode.commands.registerCommand('typewriter.playbackFromClipboard', () => {
        let minSpeed = vscode.workspace.getConfiguration('typewriter').get('TypingMinSpeed') | 30;
        let maxSpeed = vscode.workspace.getConfiguration('typewriter').get('TypingMaxSpeed') | 120;
		vscode.env.clipboard.readText().then((text)=>{
	        humanTyper_1.type(text, minSpeed, maxSpeed);
		});
    });
    let setTypewriterCmd = vscode.commands.registerCommand('typewriter.setTypewriter', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var selection = editor.selection;
        typewriterBuffer = editor.document.getText(selection);
    });
    let pausePlaybackCmd = vscode.commands.registerCommand('typewriter.pause', () => {
        humanTyper_1.pause();
    });
    context.subscriptions.push(playTypewriterCmd);
    context.subscriptions.push(playTypewriterClipboardCmd);
    context.subscriptions.push(setTypewriterCmd);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map

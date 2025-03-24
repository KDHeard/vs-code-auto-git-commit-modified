// Version 1.1: Monday, 25 March 2025 at 12:00 AM NZDT – extension.ts | Added Git commit logic using simple-git
import * as vscode from 'vscode';
import * as simpleGit from 'simple-git';

export function activate(context: vscode.ExtensionContext) {
    console.log('ADP Git Auto Commit extension is now active!');

    // Initialize simple-git with the workspace root
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace to use this extension.');
        return;
    }
    const git = simpleGit.default(workspaceRoot);

    // Listen for file save events
    const onSaveDisposable = vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
        const filePath = document.uri.fsPath;
        vscode.window.showInformationMessage(`File saved: ${filePath}`);

        try {
            // Stage the saved file
            await git.add(filePath);

            // Commit the changes with a default message (to be updated in Step 2.3)
            const commitMessage = `Auto-commit: Updated ${filePath}`;
            await git.commit(commitMessage);

            vscode.window.showInformationMessage(`Auto-committed: ${filePath}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to auto-commit: ${error.message}`);
            console.error('Git commit error:', error);
        }
    });

    // Register the event listener
    context.subscriptions.push(onSaveDisposable);
}

export function deactivate() {
    console.log('ADP Git Auto Commit extension is now deactivated.');
}
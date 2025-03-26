// Version 1.10: Wednesday, 27-Mar-2025 at 03:30 AM NZDT – extension.ts | Fixed TypeScript error in git.add call
import * as vscode from 'vscode';
import * as simpleGit from 'simple-git';

export function activate(context: vscode.ExtensionContext) {
    // Create a custom Output channel
    const outputChannel = vscode.window.createOutputChannel('ADP Git Auto Commit');
    outputChannel.appendLine('ADP Git Auto Commit extension activation started.');

    // Log to console for debugging
    console.log('ADP Git Auto Commit: Extension activation started.');

    // Register the Hello World command
    const helloWorldDisposable = vscode.commands.registerCommand('adp-git-auto-commit.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from ADP Git Auto Commit!');
        outputChannel.appendLine('Hello World command executed.');
        console.log('ADP Git Auto Commit: Hello World command executed.');
    });
    context.subscriptions.push(helloWorldDisposable);
    outputChannel.appendLine('Hello World command registered.');
    console.log('ADP Git Auto Commit: Hello World command registered.');

    // Log workspace folders for debugging
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace folder found. Please open a workspace to use this extension.');
        outputChannel.appendLine('Error: No workspace folder found.');
        console.log('ADP Git Auto Commit: Error - No workspace folder found.');
        // Log additional workspace information for debugging
        outputChannel.appendLine(`Workspace name: ${vscode.workspace.name || 'undefined'}`);
        outputChannel.appendLine(`Workspace file: ${vscode.workspace.workspaceFile?.fsPath || 'undefined'}`);
        console.log(`ADP Git Auto Commit: Workspace name - ${vscode.workspace.name || 'undefined'}`);
        console.log(`ADP Git Auto Commit: Workspace file - ${vscode.workspace.workspaceFile?.fsPath || 'undefined'}`);
        return;
    }
    outputChannel.appendLine(`Found ${workspaceFolders.length} workspace folders:`);
    workspaceFolders.forEach((folder, index) => {
        outputChannel.appendLine(`Workspace folder ${index + 1}: ${folder.uri.fsPath}`);
        console.log(`ADP Git Auto Commit: Workspace folder ${index + 1} - ${folder.uri.fsPath}`);
    });

    // Initialize simple-git with the first workspace root
    const workspaceRoot = workspaceFolders[0].uri.fsPath;
    outputChannel.appendLine(`Using workspace root: ${workspaceRoot}`);
    console.log(`ADP Git Auto Commit: Using workspace root - ${workspaceRoot}`);

    const git = simpleGit.default(workspaceRoot);
    outputChannel.appendLine('Simple-git initialized.');
    console.log('ADP Git Auto Commit: Simple-git initialized.');

    // Listen for file save events
    const onSaveDisposable = vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
        const filePath = document.uri.fsPath;
        vscode.window.showInformationMessage(`File saved: ${filePath}`);
        outputChannel.appendLine(`File saved: ${filePath}`);
        console.log(`ADP Git Auto Commit: File saved - ${filePath}`);

        try {
            // Stage the saved file (removed --force; relying on .gitignore update)
            await git.add(filePath);
            outputChannel.appendLine(`File staged: ${filePath}`);
            console.log(`ADP Git Auto Commit: File staged - ${filePath}`);

            // Commit the changes with a default message (to be updated in Step 2.3)
            const commitMessage = `Auto-commit: Updated ${filePath}`;
            await git.commit(commitMessage);
            outputChannel.appendLine(`Auto-committed: ${filePath}`);
            console.log(`ADP Git Auto Commit: Auto-committed - ${filePath}`);

            vscode.window.showInformationMessage(`Auto-committed: ${filePath}`);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`Failed to auto-commit: ${errorMessage}`);
            outputChannel.appendLine(`Git commit error: ${errorMessage}`);
            console.log(`ADP Git Auto Commit: Git commit error - ${errorMessage}`);
        }
    });

    // Register the event listener
    context.subscriptions.push(onSaveDisposable);
    outputChannel.appendLine('File save event listener registered.');
    console.log('ADP Git Auto Commit: File save event listener registered.');
}

export function deactivate() {
    console.log('ADP Git Auto Commit extension is now deactivated.');
}
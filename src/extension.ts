// Version 1.0 – 2025-03-15 – Added debug logs to troubleshoot auto-commit  
import * as vscode from 'vscode';  
import { exec } from 'child_process';  
import { getConfig } from './config';  

let isEnabled = false;  
let lastCommitTime: number = 0;  
const delayMs: number = 500;  

export function activate(context: vscode.ExtensionContext) {  
    console.log('AutoGitCommit: Extension activated successfully');  

    context.subscriptions.push(  
      vscode.commands.registerCommand('autogitcommit.enable', () => {  
        isEnabled = true;  
        vscode.window.showInformationMessage('Auto Git Commit enabled');  
        console.log('AutoGitCommit: Enabled');  
      }),  
      vscode.commands.registerCommand('autogitcommit.disable', () => {  
        isEnabled = false;  
        vscode.window.showInformationMessage('Auto Git Commit disabled');  
        console.log('AutoGitCommit: Disabled');  
      }),  
      vscode.workspace.onDidSaveTextDocument((document) => {  
        console.log('AutoGitCommit: onSaveTextDocument triggered for:', document.fileName);  
        if (isEnabled) {  
          const now = Date.now();  
          if (now - lastCommitTime < delayMs) {  
            console.log('AutoGitCommit: Within delay period, skipping commit');  
            return;  
          }  
          lastCommitTime = now;  
          console.log('AutoGitCommit: Proceeding with auto-commit for:', document.fileName);  
          autoCommitAndPush(document);  
        } else {  
          console.log('AutoGitCommit: Auto-commit disabled');  
        }  
      })  
    );  
}  

async function autoCommitAndPush(document: vscode.TextDocument) {  
    const config = getConfig();  
    console.log('AutoGitCommit: Config retrieved:', config);  
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);  

    if (!workspaceFolder) {  
      console.log('AutoGitCommit: No workspace folder found');  
      return;  
    }  

    const workspacePath = workspaceFolder.uri.fsPath;  
    console.log('AutoGitCommit: Workspace path:', workspacePath);  
    const fileName = document.fileName.split('/').pop() || 'unknown';  
    const commitMessage = `Auto commit - ${fileName}`;  

    exec(`git add .`, { cwd: workspacePath }, (err) => {  
      if (err) {  
        console.log('AutoGitCommit: Git add failed:', err.message);  
        vscode.window.showErrorMessage(`Git add failed: ${err.message}`);  
        return;  
      }  

      exec(`git commit -m "${commitMessage}"`, { cwd: workspacePath }, (err) => {  
        if (err) {  
          console.log('AutoGitCommit: Git commit failed:', err.message);  
          vscode.window.showErrorMessage(`Git commit failed: ${err.message}`);  
          return;  
        }  

        if (config.push) {  
          exec(`git push origin ${config.branch}`, { cwd: workspacePath }, (err) => {  
            if (err) {  
              console.log('AutoGitCommit: Git push failed:', err.message);  
              vscode.window.showErrorMessage(`Git push failed: ${err.message}`);  
            } else {  
              console.log('AutoGitCommit: Push successful');  
              vscode.window.showInformationMessage('Changes committed and pushed successfully');  
            }  
          });  
        } else {  
          console.log('AutoGitCommit: Commit successful');  
          vscode.window.showErrorMessage('Changes committed successfully');  
        }  
      });  
    });  
}  

export function deactivate() {  
    console.log('AutoGitCommit: Deactivated');  
}  
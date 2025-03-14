import * as vscode from 'vscode';
import { exec } from 'child_process';
import { getConfig } from './config';

let isEnabled = false;
let lastCommitTime: number = 0;
const delayMs: number = 500; // 1000ms delay between commits

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('autogitcommit.enable', () => {
      isEnabled = true;
      vscode.window.showInformationMessage('Auto Git Commit enabled');
    }),
    vscode.commands.registerCommand('autogitcommit.disable', () => {
      isEnabled = false;
      vscode.window.showInformationMessage('Auto Git Commit disabled');
    }),
    vscode.workspace.onDidSaveTextDocument((document) => {
      if (isEnabled) {
        // Throttle commits to prevent index.lock conflicts
        const now = Date.now();
        if (now - lastCommitTime < delayMs) return; // Skip if within delay
        lastCommitTime = now;
        
        autoCommitAndPush(document);
      }
    })
  );
}

async function autoCommitAndPush(document: vscode.TextDocument) {
  const config = getConfig();
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);

  if (!workspaceFolder) {
    return;
  }

  const workspacePath = workspaceFolder.uri.fsPath;

  exec(`git add .`, { cwd: workspacePath }, (err) => {
    if (err) {
      vscode.window.showErrorMessage(`Git add failed: ${err.message}`);
      return;
    }

    exec(`git commit -m "${config.commitMessage}"`, { cwd: workspacePath }, (err) => {
      if (err) {
        vscode.window.showErrorMessage(`Git commit failed: ${err.message}`);
        return;
      }

      if (config.push) {
        exec(`git push origin ${config.branch}`, { cwd: workspacePath }, (err) => {
          if (err) {
            vscode.window.showErrorMessage(`Git push failed: ${err.message}`);
          } else {
            vscode.window.showInformationMessage('Changes committed and pushed successfully');
          }
        });
      } else {
        vscode.window.showInformationMessage('Changes committed successfully');
      }
    });
  });
}

export function deactivate() {}
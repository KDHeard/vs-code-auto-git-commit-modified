"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// Version 1.0 – 2025-03-15 – Added debug logs to troubleshoot auto-commit  
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const config_1 = require("./config");
let isEnabled = false;
let lastCommitTime = 0;
const delayMs = 500;
function activate(context) {
    console.log('AutoGitCommit: Extension activated successfully');
    context.subscriptions.push(vscode.commands.registerCommand('autogitcommit.enable', () => {
        isEnabled = true;
        vscode.window.showInformationMessage('Auto Git Commit enabled');
        console.log('AutoGitCommit: Enabled');
    }), vscode.commands.registerCommand('autogitcommit.disable', () => {
        isEnabled = false;
        vscode.window.showInformationMessage('Auto Git Commit disabled');
        console.log('AutoGitCommit: Disabled');
    }), vscode.workspace.onDidSaveTextDocument((document) => {
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
        }
        else {
            console.log('AutoGitCommit: Auto-commit disabled');
        }
    }));
}
exports.activate = activate;
function autoCommitAndPush(document) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = (0, config_1.getConfig)();
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
        (0, child_process_1.exec)(`git add .`, { cwd: workspacePath }, (err) => {
            if (err) {
                console.log('AutoGitCommit: Git add failed:', err.message);
                vscode.window.showErrorMessage(`Git add failed: ${err.message}`);
                return;
            }
            (0, child_process_1.exec)(`git commit -m "${commitMessage}"`, { cwd: workspacePath }, (err) => {
                if (err) {
                    console.log('AutoGitCommit: Git commit failed:', err.message);
                    vscode.window.showErrorMessage(`Git commit failed: ${err.message}`);
                    return;
                }
                if (config.push) {
                    (0, child_process_1.exec)(`git push origin ${config.branch}`, { cwd: workspacePath }, (err) => {
                        if (err) {
                            console.log('AutoGitCommit: Git push failed:', err.message);
                            vscode.window.showErrorMessage(`Git push failed: ${err.message}`);
                        }
                        else {
                            console.log('AutoGitCommit: Push successful');
                            vscode.window.showInformationMessage('Changes committed and pushed successfully');
                        }
                    });
                }
                else {
                    console.log('AutoGitCommit: Commit successful');
                    vscode.window.showErrorMessage('Changes committed successfully');
                }
            });
        });
    });
}
function deactivate() {
    console.log('AutoGitCommit: Deactivated');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// Version 1.0 - 2025-03-24 – extension.ts | Initial implementation to detect file saves and trigger Git commits
const vscode = __importStar(require("vscode"));
const simpleGit = __importStar(require("simple-git"));
function activate(context) {
    console.log('ADP Git Auto Commit extension is now active!');
    // Initialize simple-git
    const git = simpleGit.default();
    // Listen for file save events
    const onSaveDisposable = vscode.workspace.onDidSaveTextDocument(async (document) => {
        const filePath = document.uri.fsPath;
        vscode.window.showInformationMessage(`File saved: ${filePath}`);
        // Placeholder for Git commit logic (to be implemented in Step 2.2)
        console.log(`File saved: ${filePath}. Git commit will be implemented next.`);
    });
    // Register the event listener
    context.subscriptions.push(onSaveDisposable);
}
function deactivate() {
    console.log('ADP Git Auto Commit extension is now deactivated.');
}
//# sourceMappingURL=extension.js.map
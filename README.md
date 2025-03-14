# Auto Git Commit

## Attribution
This is a modified version of the Auto Git Commit and Push extension originally developed by Yogesh Valiya. The original source code is available at [GitHub Repository](https://github.com/yogeshvaliya/vs-code-auto-git-commit). Modifications include adding a 500ms delay to prevent index.lock errors during multiple file saves. All rights to the original code remain with Yogesh Valiya under the [MIT License](LICENSE).
This VS Code extension automatically commits and pushes changes to a Git repository every time you save a file.

## Features

- Automatically commit changes on file save
- Optionally push changes after commit
- Configurable commit message and branch

## Configuration

- `autogitcommit.enable`: Enable/Disable Auto Git Commit
- `autogitcommit.push`: Automatically push after commit
- `autogitcommit.commitMessage`: Default commit message
- `autogitcommit.branch`: Branch to push changes

## Commands

- `Auto Git Commit: Enable`: Enable Auto Git Commit
- `Auto Git Commit: Disable`: Disable Auto Git Commit

## Usage

1. Open the command palette (`Ctrl+Shift+P`).
2. Run `Auto Git Commit: Enable` to enable the extension.
3. Save a file to automatically commit and push changes.
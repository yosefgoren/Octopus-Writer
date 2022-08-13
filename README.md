# Overview
The Octopus-Writer extention provides the user with some handy new commands
which are meant to enable more effective text editing, particularly focusing on
the multiple selections (a.k.a cursors) feature of vscode.

# Usage
All interaction with the extensions is through the commands which the extension provides.
It is strongly recommended to bind the more commonly used commands (such as 'Capture Selections' and 'Pop All Selections') to some key combination.

## The Captured Selections Stack
The extension maintains a stack of captured selections, these selections are not yet active and do not effect the editor until they are explicitly actiavted, this stack can manipulated/used using the following commands:

### 'Capture Selections' Command
This command will push a copy of each active selections into the top of the stack.

### 'Pop All Selections' Command
When this command is called, the set of active selections is replaced by the set of selections
in the captured selections stack. After this command is called the captured selctions stack will remain empty.

### 'Pop Last Selection' Command
This command replaces the set of active selections with the last (top) selection to be inserted into
the stack. After the command executes the selection will no longer be in the stack.

### 'Throw Captured Selections' Command
This command empties the captured selections stack.

## Text Manipulation Commands

### 'Enumerate Selections'
When this command is called, each active selection is inserted with an index (the active selections are numbered from most oldest to most recent). If a selection bounds some text - that test will be replaced by the inserted index.


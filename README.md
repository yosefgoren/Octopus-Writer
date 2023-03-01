# Overview
The [Octopus Writer](https://github.com/yosefgoren/Octopus-Writer) extention provides the user with some handy new commands
meant to enable more effective text editing, <br />
particularly focusing on the expanding on the multiple selections (A.K.A cursors) feature of [Visual Studio Code](https://visualstudio.microsoft.com/).

The extension provides a set of new commands commands which can be found with `Ctrl+Shift+P`.<br />
The provided commands are not keybound by default but it is strongly recommended to keybind the more common ones.

Since this extension is mostly focused on manipulating multiple selections at once,
it is recommended to first have a solid understanding of the multi-selection features that vscode already has:
If you are looking to get started with the multi-selection feature;
you can check out [this official documentation page](https://code.visualstudio.com/docs/editor/codebasics). There is also [this youtube tutorial](https://www.youtube.com/watch?v=E9vvELwvVG0) which might also be helpful for getting started with multi-selections.

# The Captured Selections Stack
The extension maintains a stack (list) of captured selections,
these selections do not effect the editor until they are explicitly actiavted.<br />
This stack can be manipulated using various commands detailed in [Selections Stack Manipulation](#selections-stack-manipulation).<br />

Learning how to use all of the stack commands at once can be overwhelming.
A good starting point would be to understanding the [Capture Selections](#capture-selections) and [Pop All Selections](#pop-all-selections) commands.

# Text Editor Interface
Some of the commands which this extension provides, such as [Generate Selections](#generate-selections) and [Evaluate Selections](#evaluate-selections) receive
their parameters in a unique way which is somewhat similar to a command line interface:

## TEI `Input`
The input is taken from the captured text section (usually highlighted in blue),
to pass multiple arguments, seperate arguments with a space.

## TEI `Output`
Output text will be inserted to the text editor - replacing the current captured content.<br />
The default output is `""`. In other words: commands with no output will simply delete the current captured content.

When a command is called, this input & output interface is applied to each active selection individually.<br />
The commands apply to each of the active selections by their order (The earlier captured commands are first e.t.c). 

# Selections Stack Manipulation

## Capture Selections
This command will push a copy of each active selections into the top of the stack.

## Pop All Selections
When this command is called, the set of active selections is replaced by the set of selections
in the captured selections stack. After this command is called the captured selctions stack will remain empty.

## Pop Last Selection
This command replaces the set of active selections with the last (top) selection to be inserted into
the stack. After the command executes the selection will no longer be in the stack.

## Throw Captured Selections
This command empties the captured selections stack.

## Generate Selections
`TEI: <count> <offset>`<br />
For each of the active selections, the content captured by the selection will be deleted and interpreted
as the parameters for the [Generate Selections](#generate-selections) command. The command has two parameters: `count` and `offset`.<br />
The first parameter: `count` (decimal number) dictates the number of selections which will be generated.<br />
The second parameter: `offset` (decimal number) dictates the number of lines separating the selections.<br />
These parameters are given in the form of the [Text Editor Interface](#text-editor-interface).<br />
All generated selections are appended to the [The Captured Selections Stack](#the-captured-selections-stack)

# Text Manipulation Commands

## Enumerate Selections
![ezgif com-video-to-gif](https://user-images.githubusercontent.com/62563844/222209429-561d3f54-9fa5-470d-a42f-d405badcdf1b.gif)


`TEI: (no arguments)`<br />
When this command is called, each active selection is inserted with an index (the active selections are numbered from most oldest to most recent). If a selection bounds some text - that test will be replaced by the inserted index.

## Evaluate Selections 
`TEI: <expression>`<br />
Each active selection is evaluated using `eval()` function in the javascript environment that runs the extension.
If the content of the selection can be succesfully evaluated and cast to string, that string value will replace the text captured by the selection. 
The captured text is evaluated regardless of the ability to cast the evaluated value into string, in addition the javascript environment is
presistent between calls, which means if you first evaluate `x=3` and then evaluate `x`; the latter will yeild 3.

import * as vscode from "vscode";
// Assembler import

import { Assembler } from "./assembler.js";
const assembler = new Assembler();

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("sapicpu-assembler.assemble", () => {
      let editorText = "";
      let output =
        "Copy your assembled code from here (including 'v2.o raw'): \n";
      if (vscode.window.activeTextEditor?.document.getText()) {
        editorText = vscode.window.activeTextEditor?.document.getText();
      }
      output = output.concat(assembler.assemble(editorText));

      vscode.window.showInformationMessage(output);
      vscode.window.createTerminal("Assembler");
      vscode.window.onDidOpenTerminal((terminal) => {
        console.log(output);
      });
    })
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}

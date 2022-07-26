import * as vscode from "vscode";
import { splice } from "../webpack.config.js";
// Assembler import

import { Assembler } from "./assembler.js";
const assembler = new Assembler();

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("sapicpu-assembler.assemble", () => {
      let editorText = "";
      let output = "";
      let outputConsole =
        "Copy your assembled code from here (including 'v2.o raw'): \n\n";
      if (vscode.window.activeTextEditor?.document.getText()) {
        editorText = vscode.window.activeTextEditor?.document.getText();
      }
      output = assembler.assemble(editorText);
      outputConsole = output.concat(output);

      const panel = vscode.window.createWebviewPanel(
        "sapicpu-assembler",
        "Assembled Code",
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.html = getContent(output);

      vscode.window.showInformationMessage("Your code has been assembled!");

      vscode.window.createTerminal("Assembler");
      vscode.window.onDidOpenTerminal(() => {
        console.log(outputConsole);
      });
    })
  );
}

function split(str: string, index: number) {
  const result = [str.slice(0, index), str.slice(index)];

  return result;
}

function getContent(output: string) {
  const [prefix, code] = split(output, 8);
  return `
  <!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assembled code</title>
    <style> 
      :root{
        --bg-color: #17181A;
        --accent-color: #0AB377;
        --text-color: #CDD1CC;
        --gray-500: #202123;
        --gray-400: #494A4C;

        --heading-font: 'Space Mono', monospace;
        --text-font: 'Roboto Mono', monospace;
      }
    body {
      background: var(--bg-color);
      margin: auto;
      margin-top:3rem;
      width: 80%;
      border: 2px solid #0AB377;
      padding: 10px;
      text-align: center;
      margin-bottom: 50px;
      }
      
    textarea.code {
      background: #404040;
      color: white;
      width: 90%;
      resize: none;
      display: block;
      border-radius: 10px;
      overflow-y: auto;
      overflow-x: hidden;
      font-family: monospace;
      border: 1px solid #0AB377;
      padding: 1em;
      white-space:pre-wrap;
      }

    .btn{
      margin-bottom: 15px;
      background: var(--bg-color);
      color: var(--text-color);
      font-family: var(--text-font);
      padding: 10px 15px 10px 15px;
      border: solid 1px var(--accent-color);
      font-size: 13px;

      transition: background .1s ease-out;
    }

    .btn:hover{
      background: var(--accent-color);
      color: var(--bg-color);
      cursor: pointer;
    }
    .active-btn{
      background: var(--accent-color) !important;
      color: var(--bg-color) !important;
    }

    a:link { text-decoration: none; }
    a:visited { text-decoration: none; }
    a:hover { text-decoration: none; }
    a:active { text-decoration: none; }

</style>
  </head>
  <body>
    <h2>Copy your assembled code from here (including 'v2.o raw'):</h2>
    <textarea id="textarea" class="code" contenteditable="true" spellcheck="false" aria-label='Assembled Code' >${prefix}${code}</textarea>
    <div>
      <br>
      <p>Check out our Assembly Website:</p>
      <br>
      <div>
        <a class="btn" taget="_blank" href="https://sapi-cpu.netlify.app/">SapiCPU</a>
      </div>
      <br>
    </div>
  </body>
</html>

  `;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}

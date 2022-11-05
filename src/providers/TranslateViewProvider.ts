import { GoogleTranslator } from "@translate-tools/core/translators/GoogleTranslator";
import {
  CancellationToken,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
} from "vscode";
import { getUri } from "../utilities/getUri";
import { langs } from "../utilities/languages";
const translator = new GoogleTranslator();

export class TranslateViewProvider implements WebviewViewProvider {
  public static readonly viewType = "translateHelper";

  constructor(private readonly _extensionUri: Uri) {}

  public resolveWebviewView(
    webviewView: WebviewView,
    context: WebviewViewResolveContext,
    _token: CancellationToken
  ) {
    // Allow scripts in the webview
    webviewView.webview.options = {
      enableScripts: true,
    };

    // Set the HTML content that will fill the webview view
    webviewView.webview.html = this._getWebviewContent(
      webviewView.webview,
      this._extensionUri
    );

    // Sets up an event listener to listen for messages passed from the webview view context
    // and executes code based on the message that is received
    this._setWebviewMessageListener(webviewView);
  }

  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    const toolkitUri = getUri(webview, extensionUri, [
      "node_modules",
      "@vscode",
      "webview-ui-toolkit",
      "dist",
      "toolkit.js",
    ]);
    const mainUri = getUri(webview, extensionUri, [
      "webview-ui/translate",
      "main.js",
    ]);
    const stylesUri = getUri(webview, extensionUri, [
      "webview-ui/translate",
      "styles.css",
    ]);

    return /*html*/ `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<script type="module" src="${toolkitUri}"></script>
					<script type="module" src="${mainUri}"></script>
					<link rel="stylesheet" href="${stylesUri}">
					<title>Nikin Translate</title>
				</head>
				<body>
          <section id="settings">
            <div>
              <label for="source-select">Source:</label>
              <vscode-dropdown id="source-select" class="select-box">
              ${Object.keys(langs)
                .map((key: string, index: number) => {
                  return `<vscode-option key=${index} value=${key} ${
                    key === "auto" ? "selected" : ""
                  }>${langs[key]} </vscode-option>`;
                })
                .join(" ")}
            </vscode-dropdown>
            </div>

            <div>
              <label for="target-select">Target:</label>
              <vscode-dropdown id="target-select" class="select-box">
              ${Object.keys(langs)
                .map((key: string, index: number) => {
                  return `<vscode-option key=${index} value=${key} ${
                    key === "en" ? "selected" : ""
                  }>${langs[key]} </vscode-option>`;
                })
                .join(" ")}
            </vscode-dropdown>
            </div>

          </section>
          <section>
            <vscode-text-area id="q" placeholder="The input text to translate" resize="vertical" rows="5">Enter Text</vscode-text-area>
          </section>
          <vscode-button id="translate-button">Translate</vscode-button>
          <section>
            <vscode-text-area id="translation" resize="vertical" rows="5" readonly>Translation</vscode-text-area>
          </section>
          <vscode-button id="copy-button">Copy</vscode-button>

				</body>
			</html>`;
  }

  private _setWebviewMessageListener(webviewView: WebviewView) {
    webviewView.webview.onDidReceiveMessage((message) => {
      const command = message.command;
      const q = message.q;
      const source = message.source;
      const target = message.target;
      const editor = window.activeTextEditor;

      let currentPage = "";
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        currentPage = document.getText(selection);
      }

      const translating = (keywords: string) => {
        !!keywords &&
          translator.translate(keywords, source, target).then((translate) =>
            webviewView.webview.postMessage({
              command: "translate",
              payload: JSON.stringify(translate),
            })
          );
      };

      switch (command) {
        case "translate":
          !!currentPage ? translating(currentPage) : translating(q);
          break;
      }
    });
  }
}

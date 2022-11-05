import { commands, ExtensionContext, window } from "vscode";
import { TranslateViewProvider } from "./providers/TranslateViewProvider";

export function activate(context: ExtensionContext) {
  let disposable = commands.registerCommand(
    "nikin-extension.helloWorld",
    () => {
      window.showInformationMessage("Hello World from Nikin Extension!");
    }
  );
  let copyTranslation = commands.registerCommand(
    "nikin-extension.copyTranslation",
    () => {
      window.showInformationMessage("Copied translation to Clipboard!");
    }
  );

  const translateProvider = new TranslateViewProvider(context.extensionUri);

  const translateViewDisposable = window.registerWebviewViewProvider(
    TranslateViewProvider.viewType,
    translateProvider
  );

  context.subscriptions.push(
    translateViewDisposable,
    copyTranslation,
    disposable
  );
}

export function deactivate() {}

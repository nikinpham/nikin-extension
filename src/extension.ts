import { window, commands, ExtensionContext } from "vscode";
import { TranslateViewProvider } from "./providers/TranslateViewProvider";

export function activate(context: ExtensionContext) {
  // let disposable = commands.registerCommand(
  //   "nikin-extension.helloWorld",
  //   () => {
  //     window.showInformationMessage("Hello World from Nikin Extension!");
  //   }
  // );

  const translateProvider = new TranslateViewProvider(context.extensionUri);

  const translateViewDisposable = window.registerWebviewViewProvider(
    TranslateViewProvider.viewType,
    translateProvider
  );

  context.subscriptions.push(translateViewDisposable);
}

export function deactivate() {}

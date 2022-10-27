// Get access to the VS Code API from within the webview context
const vscode = acquireVsCodeApi();
window.addEventListener("load", main);

const translateButton = document.getElementById("translate-button");
const copyTranslateTextButton = document.getElementById("copy-button");
const translation = document.getElementById("translation");

function main() {
  translateButton.addEventListener("click", translate);
  copyTranslateTextButton.addEventListener(
    "click",
    copyTranslateTextToClipboard
  );

  setVSCodeMessageListener();
}

function copyTranslateTextToClipboard() {
  !!translation.value && navigator.clipboard.writeText(translation.value);
}

function translate() {
  const source = document.getElementById("source-select").value;
  const target = document.getElementById("target-select").value;
  const q = document.getElementById("q").value;

  vscode.postMessage({
    command: "translate",
    source,
    target,
    q,
  });
}

function setVSCodeMessageListener() {
  window.addEventListener("message", (event) => {
    const command = event.data.command;
    const translateText = JSON.parse(event.data.payload);
    switch (command) {
      case "translate":
        translation.value = translateText;
        break;
    }
  });
}

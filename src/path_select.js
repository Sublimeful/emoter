const { remote } = require("electron");
const dialog = remote.dialog;
const Store = require("electron-store");
const store = new Store();
render_emotes();

//add click event to 'select' button, when clicked, call function openFile()
document.getElementById("path-button").addEventListener("click", openFile);

async function openFile() {
  //show the select file menu for directory
  result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });
  // set path to user select
  store.set("path", result.filePaths[0]);
}

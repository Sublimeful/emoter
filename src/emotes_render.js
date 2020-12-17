//declare vars
const fs = require("fs");
const { clipboard, nativeImage, shell } = require("electron");
const path = require("path");
const emote_list = document.getElementById("emote-list");
let category_visibility = {};
let size = 32;

//copies the image when you click on emote, or opens file manager when click on gif because discord is GAY
async function emote_copy(emote) {
  //create native image object
  const category = emote.parentElement.parentElement;
  const image = nativeImage.createFromPath(
    path.join(
      store.get("path"),
      category.getAttribute("aria-label"),
      emote.getAttribute("aria-label")
    )
  );

  if (image.getSize()["height"] != 0) {
    //resize image
    const resized = image.resize({
      height: size,
      width: size,
    });
    //write image to clipboard
    clipboard.writeImage(resized);
  } else {
    //open file manager and show gif if is gif
    shell.showItemInFolder(
      path.join(
        store.get("path"),
        category.getAttribute("aria-label"),
        emote.getAttribute("aria-label")
      )
    );
  }
}

//hides the category emotes when clicking on the category
async function toggle_visibility(element) {
  var emotes = element.nextSibling;
  var category = element.parentElement;
  //checks if category visibility is true for the category
  if (category_visibility[category.getAttribute("aria-label")]) {
    //for each in children of category, set it to hidden and change the text of the button
    for (i of emotes.children) {
      i.style.display = "none";
    }
    category_visibility[category.getAttribute("aria-label")] = false;
    category.firstChild.textContent =
      category.firstChild.textContent.substr(
        0,
        category.firstChild.textContent.length - 1
      ) + "^";
    //if not category visible, then
  } else {
    //for each in children of category, set it to visible and change the text of the button
    for (i of emotes.children) {
      i.style.display = "inline";
    }
    category_visibility[category.getAttribute("aria-label")] = true;
    category.firstChild.textContent =
      category.firstChild.textContent.substr(
        0,
        category.firstChild.textContent.length - 1
      ) + "v";
  }
}

async function render_emotes(keyword) {
  console.log(store.get("path"));

  //clear emotelist
  emote_list.innerHTML = "";

  //loop through category
  for await (category of fs.readdirSync(path.join(store.get("path")))) {
    //get the results of the keyword put in
    var results = (() => {
      var temp = [];
      var emote = fs.readdirSync(path.join(store.get("path"), category));
      //for i in emotes
      for (i of emote) {
        //match keyword
        regex = new RegExp(keyword, "i");
        if (i.slice(0, -4).match(regex)) {
          //push into temp array
          temp.push(i);
        }
      }
      //return temp
      return temp;
    })();

    if (results.length > 0) {
      //create category div

      var category_div = document.createElement("div");
      category_div.setAttribute("aria-label", category);
      emote_list.appendChild(category_div);

      var button_div = document.createElement("div");
      category_div.appendChild(button_div);
      button_div.style.margin = "5px";
      button_div.className = "category-button";
      button_div.style.width = "fit-content";
      button_div.style.color = "#bfbfbf";
      button_div.setAttribute("onclick", `toggle_visibility(this)`);
      button_div.textContent = category + " ^";
      category_visibility[category] = false;

      var emotes_div = document.createElement("div");
      emotes_div.className = "emotes-div";
      category_div.appendChild(emotes_div);
      // render emotes
      for (emote_name of results) {
        //create emote
        var emote = document.createElement("input");
        var emotepath = path.join(store.get("path"), category, emote_name);
        emote.type = "image";
        emote.className = "emote";
        emote.style.width = size + "px";
        emote.style.height = size + "px";
        emote.setAttribute("src", `${emotepath}`);
        emote.setAttribute("aria-label", emote_name);
        emote.setAttribute("onclick", `emote_copy(this)`);
        emote.setAttribute("draggable", true);
        emote.setAttribute("onmouseover", `emote_info(this)`);
        emote.style.display = "none";
        emotes_div.appendChild(emote);
      }
      if (keyword) {
        toggle_visibility(button_div);
      }
    }
  }
}

document.addEventListener("keypress", logger);
function logger(e) {
  if (e.key == "{") {
    const emotes = document.getElementsByClassName("emote");
    if (size <= 32) {
      size = 96;
    } else {
      size -= 16;
    }
    for (let index = 0; index < emotes.length; index++) {
      emotes[index].style.width = size + "px";
      emotes[index].style.height = size + "px";
    }
  } else if (e.key == "}") {
    const emotes = document.getElementsByClassName("emote");
    if (size >= 96) {
      size = 32;
    } else {
      size += 16;
    }
    for (let index = 0; index < emotes.length; index++) {
      emotes[index].style.width = size + "px";
      emotes[index].style.height = size + "px";
    }
  }
}

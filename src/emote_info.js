//when it needs to switch
function emote_info(emote) {
  const emote_img = document.querySelector("#emote-img");
  const emote_name = document.querySelector("#emote-name");
  emote_img.setAttribute("src", emote.getAttribute("src"));
  emote_name.textContent = emote.getAttribute("aria-label");
}

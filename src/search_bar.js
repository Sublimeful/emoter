//add event 'keydown' and call logKey() when triggered
search_bar = document.getElementById("search-bar");

//process the user's input

search_bar.addEventListener("input", async function () {
  //defining input value and setting it to the user input
  var inputValue = search_bar.value;
  //generate results
  await render_emotes(inputValue);
});

const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}
function tellJoke(joke) {
  VoiceRSS.speech({
    key: "d3373b9fc0484021a2ab01171e59fcc8",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}
// Get jokes from jokes API
async function getJokes() {
  let joke = "";
  const apiURL =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellJoke(joke);
    toggleButton();
  } catch (err) {
    console.log("Error: ", err);
  }
}

// getJokes();
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

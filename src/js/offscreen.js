// Listen for messages from the extension
chrome.runtime.onMessage.addListener((msg) => {
  playAudio(msg.data);
});

// Play sound with access to DOM APIs
function playAudio({ source, volume }) {
  const url = localStorage.getItem(source) || "sound/myturn.mp3"
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play();
}
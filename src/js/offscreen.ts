// Listen for messages from the extension
// @ts-ignore
chrome.runtime.onMessage.addListener((msg) => {
  if (msg?.target === "offscreen") {
    playAudio(msg.data);
  }
});

// Play sound with access to DOM APIs
function playAudio({ source, volume }: { source: string; volume: number }) {
  const url = localStorage.getItem(source) || "sound/myturn.mp3"
  const audio = new Audio(url);
  audio.volume = volume;
  audio.play().catch((error) => console.error("[bga extension] Unable to play sound", error));
}
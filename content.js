// content.js

// Function to set the volume of all video elements on the page
function setVolume(volume) {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.volume = volume / 100;
  });

  // Send message to background script to update the badge text
  chrome.runtime.sendMessage({ action: 'updateBadge', volume: volume });
}

// Function to retrieve the saved volume from storage and set it every 1 millisecond
function setVolumeFromStorage() {
  setInterval(() => {
    chrome.storage.sync.get('volume', function(data) {
      const volume = data.volume || 50; // Default volume to 50 if not set in storage
      setVolume(volume);
    });
  }, 1);
}

// Call the function to set volume from storage
setVolumeFromStorage();

// Listen for changes in the main content container
const observer = new MutationObserver(function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'attributes') {
      // Update the volume whenever there is a change in the observed container
      chrome.storage.sync.get('volume', function(data) {
        const volume = data.volume || 50; // Default volume to 50 if not set in storage
        setVolume(volume);
      });
    }
  }
});

// Define the main content container based on the provided class names
const mainContentContainer = document.querySelector('.x1qjc9v5.x9f619.x78zum5.xg7h5cd.xl56j7k.x1xfsgkm.xqmdsaz.x1bhewko.xgv127d.xh8yej3 .x9f619 .xjbqb8w .x78zum5 .x168nmei .x13lgxp2 .x5pf9jr .xo71vjh .xyamay9 .x1pi30zi .x1l90r2v .x1swvt13 .x1uhb9sk .x1plvlek .xryxfnj .x1iyjqo2 .x2lwn1j .xeuugli .x1q0g3np .xqjyukv .xuk3077 .x1oa3qoh .x1nhvcw1');




// Start observing the main content container
if (mainContentContainer) {
  observer.observe(mainContentContainer, { subtree: true, childList: true, attributes: true });
}

// Listen for changes to the volume slider and update volume accordingly
document.addEventListener('input', function(event) {
  if (event.target.tagName === 'INPUT' && event.target.type === 'range') {
    const volume = parseInt(event.target.value);
    setVolume(volume);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const volumeSlider = document.getElementById('volume-slider');

  // Retrieve the stored volume value on extension popup load
  chrome.storage.sync.get(['volume'], function (result) {
    const storedVolume = result.volume || 50; // Default to 50% if no value is stored
    volumeSlider.value = storedVolume;

    // Update the volume on the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'setVolume', volume: storedVolume });
    });
  });

  volumeSlider.addEventListener('input', function () {
    const currentVolume = volumeSlider.value;

    // Save the current volume value to storage
    chrome.storage.sync.set({ volume: currentVolume });

    // Send the volume value to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'setVolume', volume: currentVolume });
    });
  });
});

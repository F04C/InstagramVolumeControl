document.addEventListener('DOMContentLoaded', function () {
  const volumeSlider = document.getElementById('volume-slider');

  // Function to update the badge with the current volume level
  function updateBadge(volume) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.runtime.sendMessage({ action: 'setBadge', volume: volume, tabId: activeTab.id });
    });
  }

  // Retrieve the stored volume value on extension popup load
  chrome.storage.sync.get(['volume'], function (result) {
    const storedVolume = result.volume || 50; // Default to 50% if no value is stored
    volumeSlider.value = storedVolume;
    console.log('Stored Volume:', storedVolume);

    // Update the volume on the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'setVolume', volume: storedVolume });
      updateBadge(storedVolume); // Update badge when popup is loaded
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

  // Update badge when popup is closed
  window.addEventListener('beforeunload', function () {
    const currentVolume = volumeSlider.value;
    updateBadge(currentVolume);
  });
});

// background.js

// Keep track of the current volume level for each tab
const tabVolumes = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'setVolume') {
    const tabId = sender.tab.id;
    const volume = request.volume;

    // Store the volume level for the active tab
    tabVolumes[tabId] = volume;

    // Forward the 'setVolume' message to the content script
    chrome.tabs.sendMessage(tabId, { action: 'setVolume', volume: volume });

    // Update the badge with the current volume level
    updateBadge(tabId, volume);
  } else if (request.action === 'setBadge') {
    updateBadge(request.tabId, request.volume);
  }
});

// Listen for web navigation events
chrome.webNavigation.onCompleted.addListener(function (details) {
  const tabId = details.tabId;
  const url = details.url;

  // Check if the opened page is on Instagram
  if (url.includes('instagram.com')) {
    // Retrieve the stored volume value on page load
    chrome.storage.sync.get(['volume'], function (result) {
      const storedVolume = result.volume || 50; // Default to 50% if no value is stored
      tabVolumes[tabId] = storedVolume;

      // Update the volume on the content script
      chrome.tabs.sendMessage(tabId, { action: 'setVolume', volume: storedVolume });

      // Update the badge when a new Instagram page is loaded
      updateBadge(tabId, storedVolume);
    });
  }
});

function updateBadge(tabId, volume) {
  chrome.browserAction.setBadgeText({ text: volume.toString(), tabId: tabId });
}

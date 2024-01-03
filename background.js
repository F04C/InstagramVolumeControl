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
    
    //Update the badge with the current volume level
    updateBadge(tabId);
  }
});


function updateBadge(tabId)
{
  const volume = tabVolumes[tabId] || 0;

  chrome.browserAction.setBadgeText({text: volume.toString(), tabId: tabId})
}
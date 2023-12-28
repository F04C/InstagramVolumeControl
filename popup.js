// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const volumeSlider = document.getElementById('volume-slider');
  
    volumeSlider.addEventListener('input', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'setVolume', volume: volumeSlider.value });
      });
    });
  });
  
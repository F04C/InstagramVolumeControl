// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'setVolume') {
      const videos = document.querySelectorAll('video');
  
      videos.forEach(video => {
        video.volume = request.volume / 100;
      });
    }
  });
  
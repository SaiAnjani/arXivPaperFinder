// This file is not needed for this extension, but we'll keep it empty to maintain the structure.
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({url: 'popup.html'});
});

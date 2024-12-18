// background.js (service worker)
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Add or remove bookmarks
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((msg) => {
    if (msg.action === 'getBookmarks') {
      chrome.bookmarks.getTree((bookmarks) => {
        port.postMessage(bookmarks);
      });
    } else if (msg.action === 'removeBookmark') {
      chrome.bookmarks.remove(msg.data.id, () => {
        port.postMessage({ success: true });
      });
    }
  });
});

// utils/bookmarks.js

export const getBookmarks = () => {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.getTree((bookmarks) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(bookmarks);
        }
      });
    });
  };
  
  export const createBookmark = (title, url) => {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.create({ title, url }, (bookmark) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(bookmark);
        }
      });
    });
  };
  
  export const removeBookmark = (id) => {
    return new Promise((resolve, reject) => {
      chrome.bookmarks.remove(id, () => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  };
  
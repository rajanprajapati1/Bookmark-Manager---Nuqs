// src/components/BookMarkList.jsx

import React, { useEffect, useState } from 'react';

const BookMarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks from the service worker
  useEffect(() => {
    const fetchBookmarks = async () => {
      // Ensure chrome.runtime is available before using it
      if (typeof chrome !== 'undefined' && chrome.runtime) {
        const response = await new Promise((resolve) => {
          const port = chrome.runtime.connect();
          port.postMessage({ action: 'getBookmarks' });
          port.onMessage.addListener((message) => {
            resolve(message);
          });
        });

        setBookmarks(response);
      } else {
        console.error('chrome.runtime is not available');
      }
    };

    fetchBookmarks();
  }, []);

  // Function to remove a bookmark
  const removeBookmark = (id) => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      const port = chrome.runtime.connect();
      port.postMessage({ action: 'removeBookmark', data: { id } });
      port.onMessage.addListener(() => {
        // Update bookmarks after removal
        setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Bookmark Manager</h1>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              {bookmark.title}
            </a>
            <button onClick={() => removeBookmark(bookmark.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookMarkList;

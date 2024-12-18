// BookmarkItem.js
import React from 'react';

const BookmarkItem = ({ id, title, url, onDelete }) => {
  return (
    <li>
      <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default BookmarkItem;

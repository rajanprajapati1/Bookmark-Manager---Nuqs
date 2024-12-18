import React, { useState, useEffect, useRef } from 'react';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';
import { MdBookmarkAdded } from "react-icons/md";
import { useBookmarks } from '../../hooks/BookMarkProvider';

const BookmarkCard = ({ title, url, icon ,color ,id  }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
    const {closeModal ,EditableModal ,deleteBookmark } = useBookmarks();
  

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleEdit = (id)=>{
    EditableModal(id);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`${color} rounded-lg ${color ? 'text-white' : 'text-black'} border-4  border-b-8 border-r-8 p-4 relative`}>
      <div className="flex items-center space-x-3 mb-2">
       {icon ? <img src={icon} alt={title} className="w-10 h-10 rounded-full" /> : 
       <MdBookmarkAdded className="w-8 h-8 rounded-full" />}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" className={`${color ? 'text-white underline' : ''} text-blue-500 hover:underline`}>
        {url}
      </a>
      <button
        onClick={toggleMenu}
        className="absolute top-5 right-2 text-gray-500 hover:text-gray-700"
        ref={buttonRef} // Reference to the button
      >
        <FaEllipsisV />
      </button>
      {isMenuOpen && (
        <div
          className="absolute top-12 right-2 bg-white text-black border-2 border-r-4 border-b-4 rounded-md z-10"
          ref={menuRef}
        >
          <button onClick={()=>handleEdit(id)} className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
            <FaEdit className="text-blue-500" />
            <span>Edit</span>
          </button>
          <button onClick={()=>deleteBookmark(id)} className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 w-full text-left">
            <FaTrash className="text-red-500" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;

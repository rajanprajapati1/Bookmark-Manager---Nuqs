import React, { useRef, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useBookmarks } from '../../hooks/BookMarkProvider';
// import IconPicker from './IconSearcher';

const AddBookmarkModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const {  addBookmark ,setbookmark ,bookmark} = useBookmarks();


  const handleOnchange = (event) => {
    const { name, value } = event.target || event; // Adjust for both input and color box click
    setbookmark((prev) => ({ ...prev, [name]: value }));
  };


  const HandleForm =(e)=>{
    e.preventDefault();
    if(!bookmark?.title || !bookmark?.url) return alert('Please fill all the fields')
    addBookmark(bookmark)
    onClose()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target )) {
        onClose();
      }
    };


    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Bookmark</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <div className="iconifiy_Sec">
          {/* <IconPicker/> */}
        </div>
        <div className="color flex items-center justify-start gap-1.5">
         {['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500' ,'bg-pink-500', 'bg-indigo-500', 'bg-gray-500', 'bg-teal-500', 'bg-orange-500'].map((val,i)=>{
            return <div value={val} name={'color'} onClick={()=>handleOnchange({
                        name : 'color',
                        value : val
            })} className={`box px-3 py-3 ${bookmark?.color === val ? 'ring-2 ring-slate-300 ring-offset-2 ' :''} cursor-pointer focus:border-2 border-gray-500 rounded-full ${val}`}>
            </div>
         })}
        </div>
        <form onSubmit={HandleForm}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter bookmark title"
              onChange={(e)=>handleOnchange(e)}
              value={bookmark?.title}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter bookmark URL"
              onChange={(e)=>handleOnchange(e)}
              value={bookmark?.url}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Add Bookmark
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookmarkModal;

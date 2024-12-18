import { useQueryState } from 'nuqs';
import React, { createContext, useState, useContext, useEffect } from 'react';

const initialBookmarks = [
  { id: 1, color: '', title: 'Google', url: 'https://www.google.com', icon: 'https://www.google.com/favicon.ico' },
  { id: 2, color: '', title: 'GitHub', url: 'https://github.com', icon: 'https://github.com/favicon.ico' },
  { id: 3, color: '', title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'https://stackoverflow.com/favicon.ico' },
];

// Create the Bookmark Context
const BookmarkContext = createContext({
  bookmarks: [],
  addBookmark: () => { },
  editBookmark: () => { },
  deleteBookmark: () => { },
  isModalOpen: false,
  openModal: () => { },
  closeModal: () => { },
  editabledata: {},
  bookmark: {},
  setbookmark: () => { },
  EditableModal :(id)=>{} ,
  ToogleSearch : ()=>{} ,
  OpenSearch : false ,
  setSearch : ()=>{} ,
  Search :''
});

// Bookmark Provider Component
export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [nextId, setNextId] = useState(initialBookmarks.length + 1); // Start from the next id after the initial bookmarks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [editabledata, seteditabledata] = useState(null);
  const [OpenSearch,setOpenSearch] = useState(false)
  const [Search, setSearch] = useQueryState('Search', { defaultValue: '' })
  const [bookmark, setbookmark] = useState({
    color: '',
    title: '',
    url: ''
  })

  const ToogleSearch = ()=>{
    setOpenSearch(!OpenSearch)
  }

  const EmptyField = ()=>{
    setbookmark({
      color: '',
      title: '',
      url: ''
    })
  }
  // Add a new bookmark
  const addBookmark = (newBookmark) => {
    if(!editabledata){
      setBookmarks((prev) => [...prev, { id: nextId, ...newBookmark }]);
      setNextId((prevId) => prevId + 1); 
      EmptyField()
    }else{
      editBookmark(editabledata, newBookmark);
      seteditabledata(null)
      EmptyField()
    }
  };

useEffect(()=>{
  if(Search){
    const filteredBookmarks = bookmarks.filter((bookmark) => bookmark?.title?.toLowerCase()?.includes(Search.toLowerCase()));
    setBookmarks(filteredBookmarks);
  }else{
    setBookmarks(initialBookmarks);
  }
},[Search])

useEffect(() => {
  setSearch('');
}, []); 

  const EditableModal = (id)=>{
    seteditabledata(id)
    openModal();
    const Editabledata = bookmarks.find((bookmark) => bookmark.id === id);
    setbookmark(Editabledata);
  }
  const editBookmark = (id, updatedBookmark) => {
    setBookmarks((prev) =>
      prev.map((bookmark) => (bookmark.id === id ? { ...bookmark, ...updatedBookmark } : bookmark))
    );
    closeModal()
  };

  // Delete a bookmark
  const deleteBookmark = (id) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks, addBookmark, editBookmark, deleteBookmark,
      isModalOpen,
      closeModal,
      openModal,
      bookmark,
      setbookmark ,
      EditableModal ,
      ToogleSearch ,
      OpenSearch ,
      setSearch ,
      Search
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom Hook for using Bookmark Context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

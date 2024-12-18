import React from 'react';
import BookmarkCard from './BookmarkCard';
import { useBookmarks } from '../../hooks/BookMarkProvider';

const BookmarkList = ({}) => {
  const {bookmarks} = useBookmarks();
  if(bookmarks.length === 0){
    return <>
    <div className='w-full h-[50vh] flex items-center justify-center'>
    <h2 className='font-bold text-2xl -tracking-tight'>No BookMarks Finds ?</h2>
</div>
    </>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} {...bookmark} />
      ))}
    </div>
  )
};

export default BookmarkList;


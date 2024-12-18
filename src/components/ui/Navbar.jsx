import React from 'react';
import { FaBookmark, FaPlus } from 'react-icons/fa';
import { FiSearch  } from "react-icons/fi";
import { useBookmarks } from '../../hooks/BookMarkProvider';

const Navbar = () => {
  const {setSearch ,openModal  :open ,ToogleSearch ,Search ,OpenSearch} = useBookmarks()
  return (
    <nav className="bg-white ">
      <div className="container mx-auto max-w-screen-lg py-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaBookmark className="text-blue-500 text-2xl" />
          <span className="text-xl font-semibold">Bookmarker</span>
        </div>
   <div className="right_icon flex items-center gap-5 relative">
    {OpenSearch && <div className="input absolute w-[280px] border-2 rounded-md  right-32">
     <input type="text" className='w-full py-2 px-4 outline-none border-none'
     placeholder='Bookmarks 👍'
     onChange={(e)=>setSearch(e.target.value || null)}
     value={Search}
     autoFocus
     />
    </div>}
   <button onClick={ToogleSearch} className="p-2 text-gray-500 cursor-pointer rounded-full hover:bg-slate-100 transition-colors">
          <FiSearch  size={22} />
        </button>
   <button onClick={open} className="bg-blue-500 text-white p-2 cursor-pointer rounded-full hover:bg-blue-600 transition-colors">
          <FaPlus />
        </button>
   </div>
      </div>
    </nav>
  );
};

export default Navbar;


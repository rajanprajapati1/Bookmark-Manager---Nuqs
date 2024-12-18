import ErrorBoundry from './components/ErrorBoundry'
import Navbar from './components/ui/Navbar'
import BookmarkList from './components/ui/BookmarkList';
import AddBookmarkModal from './components/ui/BookmarkModal';
import { useBookmarks } from './hooks/BookMarkProvider';

function App() {
  const {isModalOpen ,closeModal} =useBookmarks()
  return (
    <ErrorBoundry>
      <div className="App">
        <Navbar />
        <main className="container max-w-screen-lg mx-auto py-8">
          <BookmarkList  />
        </main>
        <AddBookmarkModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </ErrorBoundry>
  );
}

export default App;

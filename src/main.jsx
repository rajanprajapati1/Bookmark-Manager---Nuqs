import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { BookmarkProvider } from './hooks/BookMarkProvider.jsx'

createRoot(document.getElementById('root')).render(
  <NuqsAdapter>
  <BookmarkProvider>
    <App />
  </BookmarkProvider>
  </NuqsAdapter>,
)

import NotesPage from "./pages/NotesPage.jsx";
import Note from "./components/note.jsx";
import FolderPage from "./pages/FolderPage";
import Editor from "./components/editor.jsx"
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FolderPage/>} />
        <Route path="folders/:id" element={<NotesPage />}>
          <Route index element={<Note />} />
          <Route path="write" element={<Editor />} />
          <Route path="write/:noteId" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

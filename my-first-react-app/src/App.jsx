import NotesPage from "./pages/NotesPage.jsx";
import FolderPage from "./pages/FolderPage";
import Editor from "./components/editor.jsx"
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<FolderPage/>} />
        <Route path="journal" element={<NotesPage/>}/>
          <Route path="write/:id" element={<Editor/>} />
          <Route path="write" element={<Editor/>} />
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

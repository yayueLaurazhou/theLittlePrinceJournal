import { Routes, Route, BrowserRouter, useParams } from 'react-router-dom';
import { lazy, Suspense } from "react";
import "./index.css";
// import NotesPage from "./pages/NotesPage.jsx";
// import FolderPage from "./pages/FolderPage";
const NotesPage = lazy(() => import("./pages/NotesPage.jsx"));
const FolderPage = lazy(() => import("./pages/FolderPage.jsx"));
import Note from "./components/note.jsx";
import Editor from "./components/editor.jsx"
import SpinnerFullPage from './components/SpinnerFullPage.jsx';
import { NotesProvider } from './contexts/NotesContext.jsx';
import { FoldersProvider } from './contexts/FoldersContext.jsx';

function App() {
  return (
    <FoldersProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<FolderPage/>} />
              <Route path="folders/:folderId" element={<NotesPageWithProvider/>}>
                <Route index element={<Note />} />
                <Route path="write" element={<Editor />} />
                <Route path="write/:noteId" element={<Editor />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
    </FoldersProvider>
  )
}

function NotesPageWithProvider() {
  const { folderId } = useParams();  

  return (
    <NotesProvider folderId={folderId}>  
      <NotesPage />
    </NotesProvider>
  );
}

export default App

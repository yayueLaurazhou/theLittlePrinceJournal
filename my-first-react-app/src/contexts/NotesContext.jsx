import React, { createContext, useContext } from 'react';
import { useNote } from '../hooks/useNote';
import { initialFolders } from '../../notes';

const NotesContext = createContext();

export function NotesProvider({ folderId, children }) {
    const { 
        state, 
        dispatch, 
        folders, 
        handleFilterButtonClick, 
        toggleDark 
      } = useNote(initialFolders, folderId);

    return (
        <NotesContext.Provider value={{
          posts: state.filteredItems, 
          tags: state.tags, 
          setTags: (tags) => dispatch({ type: 'SET_TAGS', payload: tags }),
          notes: state.notes, 
          setNotes: (notes) => dispatch({ type: 'SET_NOTES', payload: notes }),
          handleFilterButtonClick, 
          dispatch,
          toggleDark,
          folders,
          folderId,
          selectedFilters: state.selectedFilters, 
          toggleDark, 
          isDark: state.isDark,
          searchQuery: state.searchQuery,
          setSearchQuery : (query) => dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
        }}>
          {children}
        </NotesContext.Provider>
    );
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === undefined)
    throw new Error("NotesContext was used outside the NotesProvider");
  return context;
}

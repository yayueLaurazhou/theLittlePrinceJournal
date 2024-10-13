import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import { initialFolders } from '../../notes';

const initialState = {
  notes: [],
  tags: [],
  filteredItems: [],
  searchQuery: '',
  selectedFilters: [],
  isDark: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SET_TAGS':
      return { ...state, tags: action.payload };
    case 'SET_FILTERED_ITEMS':
      return { ...state, filteredItems: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_FILTERS':
      return { ...state, selectedFilters: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDark: !state.isDark };
    default:
      return state;
  }
}

export function useNote(initialFolders, folderId) {
  const folderIndex = parseInt(folderId, 10);
  const [folders, setFolders] = useLocalStorage('folders', initialFolders);
  const [state, dispatch] = useReducer(reducer, { 
    ...initialState, 
    notes: folders[folderIndex].notes,
    tags: folders[folderIndex].tags,
    filteredItems: folders[folderIndex].notes,
  });

  useEffect(() => {
    dispatch({ type: 'SET_NOTES', payload: folders[folderIndex].notes });
    dispatch({ type: 'SET_TAGS', payload: folders[folderIndex].tags });
    dispatch({ type: 'SET_FILTERED_ITEMS', payload: folders[folderIndex].notes });
  }, [folderIndex, folders]);

  useEffect(() => {
    const updatedFolders = [...folders];
    updatedFolders[folderIndex].notes = state.notes;
    updatedFolders[folderIndex].tags = state.tags;
    setFolders(updatedFolders);
  }, [state.notes, state.tags]);

  useEffect(() => {
    filterAndSearchItems();
  }, [state.selectedFilters, state.searchQuery, state.notes]);

  useEffect(() => {
    if (state.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDark]);

  function filterAndSearchItems() {
    let filteredItems = state.notes.filter((note) => !note.pinned);
    const pinnedItems = state.notes.filter((note) => note.pinned);

    if (state.selectedFilters.length > 0) {
      filteredItems = filteredItems.filter((note) => 
        note.tags.some((tag) => state.selectedFilters.includes(tag)));
    }
  
    if (state.searchQuery.length > 0) {
      filteredItems = filteredItems.filter((note) =>
        `${note.title} ${note.body}`
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase())
      );
    }
  
    dispatch({ type: 'SET_FILTERED_ITEMS', payload: [...pinnedItems, ...filteredItems] });
  }

  const handleFilterButtonClick = (selectedCategory) => {
    const newFilters = state.selectedFilters.includes(selectedCategory)
      ? state.selectedFilters.filter((el) => el !== selectedCategory)
      : [...state.selectedFilters, selectedCategory];
    dispatch({ type: 'SET_SELECTED_FILTERS', payload: newFilters });
  };

  const toggleDark = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return {
    state,
    dispatch,
    folders,
    handleFilterButtonClick,
    toggleDark,
  };
}
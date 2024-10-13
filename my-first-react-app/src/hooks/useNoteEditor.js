import { useReducer, useRef, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useNotesContext } from '../contexts/NotesContext.jsx';

const initialState = {
  title: '',
  content: '',
  displayTags: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_CONTENT':
      return { ...state, content: action.payload };
    case 'SET_DISPLAY_TAGS':
      return { ...state, displayTags: action.payload };
    case 'LOAD_NOTE':
      return {
        ...state,
        title: action.payload.title,
        content: action.payload.body,
        displayTags: action.payload.tags,
      };
    case 'RESET':
      return { ...initialState, displayTags: action.payload };
    default:
      return state;
  }
}

export function useNoteEditor() {
  const { folderId, noteId } = useParams();
  const { tags, setTags, notes, setNotes } = useNotesContext();
  const navigate = useNavigate();
  const currentTagsRef = useRef(tags);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(tags);
    if (noteId) {
      const existingNote = notes.find((note) => note.id === noteId);
      if (existingNote) {
        dispatch({ type: 'LOAD_NOTE', payload: existingNote });
      }
    } else {
      dispatch({ type: 'RESET',  payload: currentTagsRef.current.map(tag => tag.name) });
      currentTagsRef.current = currentTagsRef.current.map((tag) => ({...tag, num: tag.num + 1}));
    }
  }, [noteId, notes]);

  function removeTags(tagIndex, tagName) {
    console.log(tagName);
    currentTagsRef.current = currentTagsRef.current
      .map((tag, i) => {
        if (tag.name === tagName) {
          const updatedNum = tag.num - 1;
          console.log(tag.name + tag.num);
          return updatedNum > 0 ? { ...tag, num: updatedNum } : null;
        }
        return tag;
      })
      .filter(Boolean);

    const newDisplayTags = state.displayTags.filter((_, i) => i !== tagIndex);
    dispatch({ type: 'SET_DISPLAY_TAGS', payload: newDisplayTags });
  }

  function addTags(e) {
    if (e.target.value !== '') {
      const newTag = e.target.value.trim();
      const displayContains = state.displayTags.some(
        (tag) => tag.toLowerCase() === newTag.toLowerCase()
      );

      if (!displayContains) {
        let currContains = false;

        currentTagsRef.current = currentTagsRef.current.map((tag) => {
          if (newTag.toLowerCase() === tag.name.toLowerCase()) {
            currContains = true;
            return { ...tag, num: tag.num + 1 };
          }
          return tag;
        });

        if (!currContains) {
          currentTagsRef.current.push({ num: 1, name: newTag });
        }

        dispatch({ type: 'SET_DISPLAY_TAGS', payload: [...state.displayTags, newTag] });
      }

      e.target.value = '';
    }
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();
    if (e) navigate(`/folders/${folderId}`);
    
    if (!state.title && !state.content) return;

    const newNote = {
      id: noteId || uuidv4(),
      title: state.title,
      body: state.content,
      tags: state.displayTags,
      pinned: false,
      created: new Date().toISOString(),
    };

    if (noteId) {
      setNotes(notes.map((note) => (note.id === noteId ? newNote : note)));
    } else {
      setNotes([...notes, newNote]);
    }

    setTags(currentTagsRef.current);
    console.log(currentTagsRef.current);
  }

  return {
    state,
    dispatch,
    removeTags,
    addTags,
    handleSubmit,
  };
}
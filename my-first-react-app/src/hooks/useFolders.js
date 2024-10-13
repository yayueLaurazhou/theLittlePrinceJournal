import { useLocalStorage } from "./useLocalStorage";
import { useReducer, useEffect } from "react";
import { initialFolders } from "../../notes";

const initialState = {
    isEditing: false,
    folders: []
}

function reducer (state, action) {
    switch (action.type) {
        case 'SET_EDITING':
          return {
            ...state,
            isEditing: action.payload,
          };
        case 'UPDATE_FOLDER_NAME':
          const updatedFolders = [...state.folders];
          updatedFolders[action.payload.index].name = action.payload.name;
          return {
            ...state,
            folders: updatedFolders,
          };
        case 'ADD_FOLDER':
          return {
            ...state,
            folders: [...state.folders, action.payload],
          };
        case 'STOP_EDITING':
          return {
            ...state,
            isEditing: -1,
          };
        default:
          return state;
    }
}

export function useFolders() {
    const [storedFolders, setStoredFolders] = useLocalStorage('folders', initialFolders);
    const [state, dispatch] = useReducer(reducer, { 
        ...initialState, 
        folders: storedFolders || initialFolders
    });

    useEffect(() => {
        if (!storedFolders) {
          setStoredFolders(initialFolders);
        }
    }, [storedFolders, setStoredFolders, initialFolders]);

    useEffect(() => {
        setStoredFolders(state.folders); 
    }, [state.folders, setStoredFolders]);

    const handleDoubleClick = (index) => {
        dispatch({ type: 'SET_EDITING', payload: index });
    };

    const handleChange = (e, index) => {
        dispatch({
        type: 'UPDATE_FOLDER_NAME',
        payload: { index, name: e.target.value }
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
        dispatch({ type: 'STOP_EDITING' });
        }
    };

    const createNewFolder = () => {
        const newFolder = {
        name: "default name",
        notes: [],
        tags: [],
        };
        dispatch({ type: 'ADD_FOLDER', payload: newFolder });
    };

    return {
        state,
        dispatch,
        handleChange,
        handleDoubleClick,
        handleKeyDown,
        createNewFolder
    }
}
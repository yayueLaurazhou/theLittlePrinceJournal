import React, { createContext, useContext } from 'react';
import { useFolders } from '../hooks/useFolders';

const FoldersContext = createContext();

export function FoldersProvider({ children }) {
    const { 
        state,
        dispatch,
        handleChange,
        handleDoubleClick,
        handleKeyDown,
        createNewFolder
      } = useFolders();

    return (
        <FoldersContext.Provider value={{
            state,
            dispatch,
            handleChange,
            handleDoubleClick,
            handleKeyDown,
            createNewFolder
        }}>
        {children}
        </FoldersContext.Provider>
    );
}


export function useFoldersContext() {
    const context = useContext(FoldersContext);
    if (context === undefined)
      throw new Error("FoldersContext was used outside the FoldersProvider");
    return context;
}
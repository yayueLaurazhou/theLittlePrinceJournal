import { useState, useEffect } from "react";
import { initialFolders } from "../../notes";
import { Link } from "react-router-dom";

export default function Folder(){
    const [isEditing, setIsEditing] = useState(-1);
    const [folders, setFolders] = useState(initialFolders);
  
    const handleDoubleClick = (index) => {
        setIsEditing(index);
    };

    const handleChange = (e, index) => {
        const updatedFolders = [...folders];
        updatedFolders[index].name = e.target.value; 
        setFolders(updatedFolders);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditing(-1);
        }
    };

    // useEffect (() => {
    //     localStorage.setItem('folders', JSON.stringify(folders));
    //   }, [folders])
    
    // useEffect (() => {
    //     const folders = JSON.parse(localStorage.getItem('folders'));
    //     setFolders(folders);
    // }, [])
  
    return (
        <div class="container mt-3 grid grid-cols-1 md:grid-cols-2">
            {folders?.map((folder, i) => (
                <div key={i} className="flex flex-col justify-center">
                    <Link to="journal" className="block w-32 h-32">
                        <img src="/folder.svg" class="cursor-pointer w-32 h-32"/>
                    </Link>
                    {isEditing == i? (
                        <input
                        type="text"
                        value={folder.name}
                        onChange={(e) => handleChange(e,i)}
                        onKeyDown={handleKeyDown}
                        onBlur={() => setIsEditing(-1)} 
                        autoFocus
                        className="border w-32 -mt-3 ml-4"
                        />
                    ) : (
                        <h4
                        onDoubleClick={() => handleDoubleClick(i)}
                        className="cursor-pointer -mt-3 ml-4">
                        {folder.name}
                        </h4>
                    )}
                </div>
            ))}
        </div>
    )
}
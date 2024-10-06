import { useState, useEffect } from "react";
import { initialFolders } from "../../notes";
import { Link } from "react-router-dom";

export default function Folder({handleChange, handleDoubleClick, handleKeyDown, isEditing, setIsEditing,folders,setFolders}){

    return (
        <div class="container mt-3 grid grid-cols-1 md:grid-cols-2">
            {folders?.map((folder, i) => (
                <div key={i} className="flex flex-col justify-center">
                    <Link to={`folders/${i}`} className="block w-32 h-32">
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
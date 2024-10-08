import { useState, useEffect } from "react";
import { initialFolders } from "../../notes";
import '@fontsource/nanum-pen-script/400.css'; 
import background from "../../public/background.jpg";
import RoundButton from "../components/roundButton";
import addButtonSvg from "../../public/hug.png";
import Folder from "../components/folder";

const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center'
  };
  
export default function FolderPage(){
    const [isEditing, setIsEditing] = useState(-1);
    const [folders, setFolders] = useState(() => {
        const storedFolders = localStorage.getItem('folders');
        return storedFolders ? JSON.parse(storedFolders) : initialFolders;
      });
  
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

    useEffect (() => {
        localStorage.setItem('folders', JSON.stringify(folders));
      }, [folders])
  
    function createNewFolder() {
        const storedFolders = JSON.parse(localStorage.getItem('folders')) || [];
    
        const newFolder = {
          name: "default name",
          notes: [], 
          tags: [], 
        };

        const newFolders = [... storedFolders, newFolder];
    
        setFolders(newFolders);
    }

    return (
        <main style={backgroundStyle}>
            <div class="flex h-screen gap-6">
                <div class="w-2/3 ml-5 mt-3">
                    <div class="ml-5">
                        <h1 style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px'}}> Create your own planet!</h1>
                    </div>
                    <Folder handleChange={handleChange} handleDoubleClick={handleDoubleClick} 
                    handleKeyDown={handleKeyDown} isEditing={isEditing} setIsEditing={setIsEditing} folders={folders} setFolders={setFolders}></Folder>
                </div>
                <div class="w-1/3">
                    <RoundButton imgSource={addButtonSvg} isAdd={true} handleClick={createNewFolder}></RoundButton>
                </div>
            </div>
        </main>
    )
}
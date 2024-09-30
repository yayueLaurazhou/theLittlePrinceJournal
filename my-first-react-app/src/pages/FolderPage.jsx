import { useState, useEffect } from "react";
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
    return (
        <main style={backgroundStyle}>
            <div class="flex h-screen gap-6">
                <div class="w-2/3 ml-5 mt-3">
                    <div class="ml-5">
                        <h1 style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px'}}> Create your own planet!</h1>
                    </div>
                    <Folder></Folder>
                </div>
                <div class="w-1/3">
                    <RoundButton imgSource={addButtonSvg} isAdd={true}></RoundButton>
                </div>
            </div>
        </main>
        
    )
}
import '@fontsource/nanum-pen-script/400.css'; 
import background from "../../public/background.jpg";
import RoundButton from "../components/roundButton";
import addButtonSvg from "../../public/hug.png";
import Folder from "../components/folder";
import { useFoldersContext } from '../contexts/FoldersContext';
import { Link } from "react-router-dom";

const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover', 
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center'
  };
  
export default function FolderPage(){
    const {createNewFolder}  = useFoldersContext();
    
    return (
        <main style={backgroundStyle}>
            <div class="flex h-screen gap-6">
                <div class="w-2/3 ml-5 mt-3">
                    <div class="ml-5">
                        <h1 style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px'}}> Create your own planet!</h1>
                    </div>
                    <Folder/>
                </div>
                <div class="w-1/3">
                    <RoundButton imgSource={addButtonSvg} isAdd={true} handleClick={createNewFolder}></RoundButton>
                </div>
                <button 
                    className="fixed bottom-4 right-4 w-40 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600">
                    <Link to="/" className='flex items-center justify-center w-full'>   
                        Back
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </Link> 
                </button>

            </div>
        </main>
    )
}
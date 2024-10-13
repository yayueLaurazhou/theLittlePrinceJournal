import { Link } from "react-router-dom";
import { useFoldersContext } from "../contexts/FoldersContext";

export default function Folder(){
    const {handleChange, handleDoubleClick, handleKeyDown, state} = useFoldersContext();
    return (
        <div class="container mt-3 grid grid-cols-1 md:grid-cols-2">
            {state.folders?.map((folder, i) => (
                <div key={i} className="flex flex-col justify-center">
                    <Link to={`folders/${i}`} className="block w-32 h-32">
                        <img src="/folder.svg" class="cursor-pointer w-32 h-32"/>
                    </Link>
                    {state.isEditing == i? (
                        <input
                        type="text"
                        value={folder.name}
                        onChange={(e) => handleChange(e,i)}
                        onKeyDown={handleKeyDown}
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
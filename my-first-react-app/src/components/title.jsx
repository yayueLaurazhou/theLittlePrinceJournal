import { useNotesContext } from "../contexts/NotesContext"

export default function Title(){
    const {folders, folderId} = useNotesContext();
    return (
    <h1 style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px'}} className="mt-3">
        Welcome to {folders[folderId].name}
    </h1>
    )
}
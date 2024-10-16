import { useNotesContext } from "../contexts/NotesContext"

export default function Title({isDark}){
    const {folders, folderId} = useNotesContext();
    return (
    <h1 style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px'}} className={`mt-3 ${isDark ? 'text-white' : 'text-black'}`}>
        Welcome to {folders[folderId].name}! Start journaling...
    </h1>
    )
}
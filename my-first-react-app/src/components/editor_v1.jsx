import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate} from "react-router-dom";
import ReactQuill from 'react-quill-new'
import { v4 as uuidv4 } from 'uuid';
import 'react-quill-new/dist/quill.snow.css';
import "../pages/NotesPage_V1";
import "./editor.css"
import { NotesContext } from "../pages/NotesPage_V1";


const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
  
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
  
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
  
      ["clean"],
    ],
  };

export default function Editor(){
    const { folderId , noteId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const {tags, setTags, notes, setNotes} = useContext(NotesContext);
    const [currentTags, setCurrentTags] = useState(tags); 
    // currentTags seperate it from the tags, which is linked to localStorage by useEffect,
    // until the form submit, the tags in localStorage won't change.
    const [displayTags, setDisplayTags] = useState(() => {
        if (noteId){
            const existingNote = notes.find(({ id }) => id === noteId);
            return existingNote.tags;
        } else {
            return currentTags.map(tag => tag.name)
        }
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        const existingNote = notes.find((note) => note.id === noteId);
        console.log(noteId);
        
        if (noteId) {
            setContent(existingNote.body);  
            setTitle(existingNote.title);
            setDisplayTags(existingNote.tags);
        } else {
            setContent("");  
            setTitle("");
            setCurrentTags(currentTags.map((tag) => ({...tag, num: tag.num + 1})))
        }
      }, [noteId]);

	function removeTags (index) {
		setCurrentTags(currentTags.map((tag, i) => {
            if (i === index) {
                const updatedNum = tag.num - 1;
                return updatedNum > 0 ? { ...tag, num: updatedNum } : null;
              }
              return tag;
            
            }).filter(Boolean));
        setDisplayTags(displayTags.filter((_, i) => i !== index))
	};

	function addTags (e) {
		if (e.target.value !== "") {
            const newTag = e.target.value.trim();
            let currContains = false;
            let displayContains = displayTags.some(tag => tag.toLowerCase() === newTag.toLowerCase());
            if (!displayContains){
                setCurrentTags(currentTags.map((tag => {
                    if (newTag.toLowerCase() === tag.name.toLowerCase()) {
                        currContains = true;
                        return { ...tag, num: tag.num + 1 };
                      }
                      return tag;
                })));
                if (!currContains){
                    setCurrentTags([...currentTags,  {num: 1, name: newTag}]);
                }
                setDisplayTags([...displayTags, newTag]);
            }
            e.target.value = "";
		}
	};

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/folders/${folderId}`);

        if (!title && !content) return;

        const newNote = {
            id: uuidv4(), 
            title,
            body: content,  
            tags: displayTags,
            pinned: false,
            created: new Date().toISOString()
        }

        if (noteId){
            setNotes(notes.map((note) => {
                if (note.id == noteId) {
                    return {...note,  
                        title,
                        body: content,  
                        tags: displayTags,
                    }
                }
                    return note;
            }));
        } else {
            setNotes([...notes, newNote]);
        }

        setTags(currentTags);
        
        console.log(notes);
        console.log(tags);
        
    }

    return (
        <form style={{backgroundColor: "white", display: "flex", flexDirection: "column", margin: "1em", gap: "1em", borderRadius: "6px" }} onSubmit={handleSubmit}>
            <input
                style={{height: "50px", fontSize: "18px", marginLeft: "1em", marginTop: "1em", marginRight: "1em"}}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title here"
            /> 
            <ReactQuill
                theme="snow"
                onChange={setContent}
                modules={modules}
                className="ql-lightbg"
                style={{ height: "5in", margin: "1em"}}
            />
            <div className="flex items-center justify-between">
            <div className="tags-input mt-16 ml-4 mb-5">
                <ul id="tags">
                    {displayTags.map((tag, index) => (
                        <li key={index} className="tag">
                            <span className='tag-title'>{tag}</span>
                            <span className='tag-close-icon'
                                onClick={() => removeTags(index)}
                            >
                                x
                            </span>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); 
                          addTags(e);
                        }
                    }}
                    placeholder="Press enter to add tags"
                />
            </div>
            <button class="mt-10 mr-4 rounded-md border border-transparent py-2 px-4 flex items-center text-center transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
                Back
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1.5">
                    <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
            </div>
        </form>
      );
}

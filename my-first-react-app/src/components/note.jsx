import { Link, useLocation } from "react-router-dom";
import { useNotesContext } from "../contexts/NotesContext.jsx";

export default function Note(){
    const {posts, setNotes, notes} = useNotesContext();
    const location = useLocation(); 

    function formatDate(dateString) {
        const date = new Date(dateString);
        
        return new Intl.DateTimeFormat('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        }).format(date); 
      }
      

    const handleDoubleClick = (index) => {
        const updatedNotes = [...posts];
        updatedNotes[index].pinned = !updatedNotes[index].pinned;
    
        const pinnedNotes = updatedNotes.filter(note => note.pinned);
        const unpinnedNotes = updatedNotes.filter(note => !note.pinned);
    
        setNotes([...pinnedNotes, ...unpinnedNotes]);
    }


    const handleDeleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id)); 
    }
    
    return(
        <>
        <div className="container mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            {posts?.length > 0 ? (
                posts.map((post, i) => (
                <div 
                    key={i} 
                    className={`h-64 bg-white flex flex-col justify-between border-gray-600 hover:border-black hover:border-[3px] hover:shadow-lg rounded-lg border border-gray-400 mb-6 py-5 px-4 ${post?.pinned ? "border-[3px]" : ""}`} 
                    onDoubleClick={() => handleDoubleClick(i)}
                >
                    <div className="flex justify-between">
                    <h4 className="font-bold">{post?.title}</h4>
                    <h3>{post?.pinned && '📌'}</h3>
                    </div>

                    <div className="flex flex-wrap">
                    {post.tags?.map((tag, index) => (
                        <div 
                        key={index}
                        className="border border-gray-800 rounded-full px-3 py-1 mr-2 text-xs flex items-center justify-center"
                        >
                        <p>{tag}</p>
                        </div>
                    ))}
                    </div>

                    <div className="flex justify-between">
                    <div className="flex items-center justify-center ml-auto">
                        <p className="mr-5 text-sm">{formatDate(post?.lastUpdated)}</p>

                        <div className="flex space-x-1.5">
                        <Link to={`${location.pathname}/write/${post.id}`}> 
                            <button 
                            className="w-8 h-8 rounded-full bg-white dark:bg-black dark:text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" 
                            aria-label="edit note" 
                            role="button"
                            >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="icon icon-tabler icon-tabler-pencil" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor" 
                                fill="none" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                            </svg>
                            </button>
                        </Link>

                        <button 
                            className="w-8 h-8 rounded-full bg-white dark:bg-black dark:text-white-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" 
                            aria-label="delete note" 
                            role="button" 
                            onClick={() => handleDeleteNote(post.id)}
                        >
                            <svg 
                            className="w-6 h-6 text-gray-800 dark:text-white" 
                            aria-hidden="true" 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            fill="none" 
                            viewBox="0 0 24 24"
                            >
                            <path 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="1.5" 
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                            />
                            </svg>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                ))
            ) : null} 
            </div>
            {posts?.length === 0 && (
            <h3 
                style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px' }} 
                className="mt-3 text-center text-gray-500"
            >
                There are no notes in this planet, click the bottom right planet and start writing!
            </h3>
            )}
        </>
    );
        
       
}

{/* <div class="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
<div>
    <h3 class="text-gray-800 dark:text-gray-100 leading-7 font-semibold w-11/12">What does success as a UX designer look like and how to get there systematically</h3>
</div>
<div>
    <div class="flex items-center justify-between text-gray-800">
        <p class="dark:text-gray-100 text-sm">March 28, 2020</p>
        <button class="w-8 h-8 rounded-full dark:bg-gray-100 dark:text-gray-800 bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
            </svg>
        </button>
    </div>
</div>
</div>

</div> */}
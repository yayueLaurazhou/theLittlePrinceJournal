import {notes} from "../notes"



export default function Note(){
    return( 
        <>
    <div class="container mx-auto mt-3">
        {notes?.map((note, i) => (
            <div key={i} class="h-64 bg-white flex flex-col justify-between dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                <div class="flex flex-nowraps justify-between">
                    <h4 class="font-bold mb-3">{note?.title}</h4>
                    <h3>{note?.pinned && '📌'}</h3>
                </div>
                <div class="flex justify-between">
                    <div class="flex flex-nowrap">
                        {note.tags?.map((tag, i) => (
                        <div class="mb-3 border border-gray-800 rounded-full px-3 py-1 mr-2 text-xs flex items-center justify-center">
                            <p>{tag}</p>
                        </div>
                        ))}
                    </div>
                    <div class="flex items-center justify-center">
                        <p class="mr-5 text-sm">March 28, 2023</p>
                        <button class="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black" aria-label="edit note" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z"></path>
                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        ))}

        <div class="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
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

    </div>
    </>
    );
}
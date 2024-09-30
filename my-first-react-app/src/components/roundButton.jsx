import './roundButton.css';


export default function RoundButton({imgSource,isAdd}){
    return(
        <button class={`relative group ${isAdd ? "" : '-mt-3 hover:shadow-lg hover:shadow-indigo-500/50 rounded-full bg-white transform transition-transform duration-1000 hover:rotate-[360deg]'} items-center justify-center`}>
            <img src={imgSource} className={`${isAdd ? 'w-30 h-40 group-hover:opacity-0' : 'w-16 h-16'}`}/>
            {isAdd ? <span className="rounded-full w-20 h-20 absolute inset-y-10 inset-x-3 bg-white opacity-0 transition-opacity duration-600 flex items-center justify-center group-hover:opacity-100">
                <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
                </svg>
             </span> : ""}
        </button>
    ) 
}
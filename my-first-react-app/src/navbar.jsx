export default function NavBar(){

    return (
        <nav>
            <ol class="flex flex-wrap items-center w-full bg-opacity-60 rounded-md bg-transparent p-0 transition-all">
                <div class="text-blue-gray-900 align-bottom antialiased font-sans font-normal leading-normal">
                    <a href="#"class="flex align-bottom items-center cursor-pointer transition-colors duration-300 hover:text-light-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <h3 class="ml-2 align-bottom cursor-pointer transition-colors duration-300 hover:text-light-blue-500">Home</h3>
                    </a>
                </div>
                <span class="text-gray-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
                    <li class="flex items-center text-blue-900 antialiased font-sans font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-blue-500">
                    <h3 class="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">folder1</h3>
                </li>
            </ol>
        </nav>
    )
    
}
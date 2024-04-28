import Note from "./note";
import SideBar from "./sidebar";
import NavBar from "./navbar";
import {useState, useEffect} from "react";
import "./index.css";


function App() {
  const [isDark, setIsDark] = useState(false)
  // const [isEdit]

  const toggleDark = () => {
    setIsDark(isDark ? false : true)
  }

  useEffect( 
    function(){
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark")
      }
  }, 
  [isDark]);

  return (
    <div>
      <section className="flex justify-between mr-5">
        <SideBar/>
        <main>
          <NavBar/>
          <Note/>
        </main>
        <aside>
          <SearchBar/>
          <TagsFilter/>
          <DarkModeButton/>
        </aside>
      </section>
      
    </div>
  )
}


function SearchBar(){
  return (
    <div class="pt-2 relative mx-auto text-gray-600">
      <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search" name="search" placeholder="Search"/>
      <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </div>
  );
}


function TagsFilter(){
  return(
    <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm px-3 py-1 bg-green-200 text-green-700 rounded-full">
      Tag
    </div>
  );
}


function DarkModeButton({isDark, toggleDark}){
  
  const darkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>

  const lightIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>

  return(
  
      <button class="w-20 h-10 rounded-full bg-white items-center transition duration-300 focus:outline-none shadow"
          onClick={toggleDark}>
          <div class="w-12 h-12 relative rounded-full transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 text-white">
              {isDark ? darkIcon : lightIcon}
          </div>
      </button>
      

  
  ) 
}

export default App

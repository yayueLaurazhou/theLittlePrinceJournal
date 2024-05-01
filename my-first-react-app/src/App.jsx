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
          <DarkModeButton isDark={isDark} toggleDark={toggleDark}/>
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

  const lightIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>

  return(
      <button className="w-20 h-10 rounded-full bg-white items-center transition duration-300 focus:outline-none shadow "
          onClick={toggleDark}>
          <div className= {`w-12 h-12 relative rounded-full transition duration-500 transform bg-yellow-500 -translate-x-2 p-1 text-white ${isDark ? 'bg-gray-700': 'bg-yellow-500'} ${isDark ? 'translate-x-full': '-translate-x-2'}`}>
              {isDark ? darkIcon : lightIcon}
          </div>
      </button>
  ) 
}

export default App

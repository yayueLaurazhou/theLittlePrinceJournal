import {useState, useEffect, createContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@fontsource/nanum-pen-script/400.css'; 
import Note from "../components/note";
import TagsFilter from "../components/tagsFilter";
import DarkModeButton from "../components/DarkModeButton";
import SearchBar from "../components/searchBar";
import RoundButton from "../components/roundButton";
import Editor from "../components/editor";
import { tags } from "../../notes";
import { initialFolders } from "../../notes";
import backgroundImagelight from "../../public/light-watercolor-bg.jpg";
import returnButtonSvg from "../../public/universe-planet-03-svgrepo-com.svg";
import addButtonSvg from "../../public/hug.png";
import { useContext } from "react";



const backgroundStyle = {
  backgroundImage: `url(${backgroundImagelight})`,
  backgroundSize: 'cover', 
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center'
};

export const NotesContext = createContext();

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const {id} = useParams();
  const folderIndex = parseInt(id, 10);
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/"); 
  }; 
 
  // useEffect (() => {
  //   console.log(initialFolders);
  //   console.log(id);
  //   localStorage.setItem('notes', JSON.stringify(initialFolders[folderIndex].notes));
  // }, [initialFolders,id])

  useEffect (() => {
    const storedNotes = JSON.parse(localStorage.getItem('folders'));
    setNotes(storedNotes[folderIndex].notes);
  }, [])

  function filterAndSearchItems() {
    let filteredItems = notes.filter((note) => !note.pinned);
    const pinnedItems = notes.filter((note) => note.pinned);

    if (selectedFilters.length > 0) {
      filteredItems = filteredItems.filter((note) => 
        note.tags.some((tag) => selectedFilters.includes(tag)));
    }
  
    if (searchQuery.length > 0) {
      filteredItems = filteredItems.filter((note) =>
        `${note.title} ${note.body}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
  
    setFilteredItems([...pinnedItems,...filteredItems]);
  }

  const handleFilterButtonClick = (selectedCategory) => {
      if (selectedFilters.includes(selectedCategory)) {
        let filters = selectedFilters.filter((el) => el !== selectedCategory);
        setSelectedFilters(filters);
      } else {
        setSelectedFilters([...selectedFilters, selectedCategory]);
      }
  };

  useEffect(() => {
    filterAndSearchItems();
  }, [selectedFilters, searchQuery, notes]);


  const toggleDark = () => {
    setIsDark(isDark ? false : true)
  };

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
    <NotesContext.Provider value={{posts: filteredItems, setNotes: setNotes}}>
      <div style={backgroundStyle}>
        <section className="flex justify-between">
          <main className="flex-3 mx-6">
            <h1 style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px'}} class="mt-3">Welcome to xxx, start journaling now...</h1>
            {/* <Note posts={filteredItems} setNotes={setNotes}/> */}
            {/* <Editor/> */}
            <Outlet />
          </main>
          <aside className="flex-2 mt-8 mr-6">
            <div class="flex gap-6">
              <DarkModeButton isDark={isDark} toggleDark={toggleDark}/>
              <RoundButton imgSource={returnButtonSvg} isAdd={false} handleClick={handleReturn}></RoundButton>
            </div>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <Calendar onChange={setDate} value={date} />
            <TagsFilter tags={tags} handleFilterButtonClick={handleFilterButtonClick} selectedFilters={selectedFilters}/>
          </aside>
          <div className="fixed bottom-2 right-6">
            <RoundButton imgSource={addButtonSvg} isAdd={true}></RoundButton>
          </div>
        </section>
      </div>
    </NotesContext.Provider>
  )
}


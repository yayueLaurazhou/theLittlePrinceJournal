import {useState, useEffect, createContext} from "react";
import { useNavigate, Outlet, useParams, Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@fontsource/nanum-pen-script/400.css'; 
import Note from "../components/note";
import TagsFilter from "../components/tagsFilter";
import DarkModeButton from "../components/darkModeButton";
import SearchBar from "../components/searchBar";
import RoundButton from "../components/roundButton";
import Editor from "../components/editor_v1";
import { initialTags } from "../../notes";
import { initialFolders } from "../../notes";
import backgroundImagelight from "../../public/light-watercolor-bg.jpg";
import returnButtonSvg from "../../public/universe-planet-03-svgrepo-com.svg";
import addButtonSvg from "../../public/hug.png";



const backgroundStyle = {
  backgroundImage: `url(${backgroundImagelight})`,
  backgroundSize: 'cover', 
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center'
};

export const NotesContext = createContext();

export default function NotesPage() {
  const {folderId} = useParams();
  const folderIndex = parseInt(folderId, 10);
  const [notes, setNotes] = useState(() => {
    const storedFolders = JSON.parse(localStorage.getItem('folders'));
    if (storedFolders && storedFolders[folderIndex].notes) {
      return storedFolders[folderIndex].notes;
    } else {
      return initialFolders[folderIndex].notes;
    }
  });
  const [tags, setTags] = useState(() =>  {
    const storedFolders = JSON.parse(localStorage.getItem('folders'));
    if (storedFolders && storedFolders[folderIndex].tags) {
      return storedFolders[folderIndex].tags;
    } else {
      return initialTags;
    }
  });
  const [date, setDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/"); 
  }; 
 
  useEffect (() => {
    const storedFolders = JSON.parse(localStorage.getItem('folders'));
    if (!storedFolders) {
      localStorage.setItem('folders', JSON.stringify(initialFolders));
    }
  }, [])

  useEffect (() => {
    const storedFolders = JSON.parse(localStorage.getItem('folders'));
    setNotes(storedFolders[folderIndex].notes);
  }, [folderIndex])

  useEffect(() => {
    const storedFolders = JSON.parse(localStorage.getItem('folders'));
    storedFolders[folderIndex].notes = notes;
    localStorage.setItem('folders', JSON.stringify(storedFolders));
  }, [notes]);

  useEffect (() => {
    const storedFolders = JSON.parse(localStorage.getItem('folders'));
    setTags(storedFolders[folderIndex].tags);
  }, [folderIndex])

  useEffect(() => {
    const storedFolders = JSON.parse(localStorage.getItem('folders'));
    storedFolders[folderIndex].tags = tags;
    localStorage.setItem('folders', JSON.stringify(storedFolders));
  }, [tags]);

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

  const storedFolders = JSON.parse(localStorage.getItem('folders')) || [];

  return (
    <NotesContext.Provider value={{posts: filteredItems, tags, setTags, notes, setNotes, handleFilterButtonClick, selectedFilters}}>
      <div style={backgroundStyle}>
        <section className="flex justify-between">
          <main className="flex-3 mx-6">
            <h1 style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px'}} class="mt-3">Welcome to {storedFolders[folderIndex].name}</h1>
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
            <TagsFilter/>
          </aside>
          <div className="fixed bottom-2 right-6">
            <Link to={`/folders/${folderId}/write`}>
              <RoundButton imgSource={addButtonSvg} isAdd={true}></RoundButton>
            </Link>
          </div>
        </section>
      </div>
    </NotesContext.Provider>
  )
}


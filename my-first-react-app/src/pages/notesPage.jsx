import {useState, useEffect} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@fontsource/nanum-pen-script/400.css'; 
import Note from "../components/note";
import TagsFilter from "../components/tagsFilter";
import DarkModeButton from "../components/DarkModeButton";
import SearchBar from "../components/searchBar";
import RoundButton from "../components/roundButton";
import { tags } from "../../notes";
import { initialNotes } from "../../notes";
import backgroundImagelight from "../../public/light-watercolor-bg.jpg";
import returnButtonSvg from "../../public/universe-planet-03-svgrepo-com.svg";
import addButtonSvg from "../../public/hug.png";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImagelight})`,
  backgroundSize: 'cover', 
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center'
};


export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(notes);

  useEffect (() => {
    localStorage.setItem('notes', JSON.stringify(initialNotes));
  }, [notes])

  useEffect (() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    setNotes(storedNotes);
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
    <div style={backgroundStyle}>
      <section className="flex justify-between">
        <main className="flex-3 mx-6">
          <h1 style={{ fontFamily: 'Nanum Pen Script, cursive', fontSize: '50px'}} class="mt-3">Welcome to xxx, start journaling now...</h1>
          <Note posts={filteredItems} setNotes={setNotes}/>
        </main>
        <aside className="flex-2 mt-8 mr-6">
          <div class="flex gap-6">
            <DarkModeButton isDark={isDark} toggleDark={toggleDark}/>
            <RoundButton imgSource={returnButtonSvg}></RoundButton>
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
  )
}


import { useNavigate, Outlet, Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@fontsource/nanum-pen-script/400.css'; 
import TagsFilter from "../components/tagsFilter";
import DarkModeButton from "../components/DarkModeButton";
import SearchBar from "../components/searchBar";
import RoundButton from "../components/roundButton";
import Title from "../components/title";
import backgroundImagelight from "../../public/light-watercolor-bg.jpg";
import backgroundImageDark from "../../public/dark-bg.jpg";
import returnButtonSvg from "../../public/universe-planet-03-svgrepo-com.svg";
import addButtonSvg from "../../public/hug.png";
import { useNotesContext } from "../contexts/NotesContext";

export default function NotesPage() {
    const {folderId, isDark} = useNotesContext();
    const navigate = useNavigate();
  
    const handleReturn = () => {
      navigate("/folders"); 
    };

    const backgroundStyle = {
      backgroundImage: `url(${isDark ? backgroundImageDark : backgroundImagelight})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center',
      minHeight: '100vh'
    };
  
    return (
        <div style={backgroundStyle}>
          <section className="flex justify-between">
            <main className="flex-3 mx-6">
              <Title isDark={isDark}/>
              <Outlet />
            </main>
            <aside className="flex-2 mt-8 mr-6">
              <div className="flex gap-6">
                <DarkModeButton/>
                <RoundButton imgSource={returnButtonSvg} isAdd={false} handleClick={handleReturn}></RoundButton>
              </div>
              <SearchBar/>
              <Calendar/>
              <TagsFilter/>
            </aside>
            <div className="fixed bottom-2 right-6">
              <Link to={`/folders/${folderId}/write`}>
                <RoundButton imgSource={addButtonSvg} isAdd={true}></RoundButton>
              </Link>
            </div>
          </section>
        </div>
    );
  }
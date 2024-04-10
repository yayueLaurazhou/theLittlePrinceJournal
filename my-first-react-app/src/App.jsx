import Note from "./note";
import SideBar from "./sidebar";
import "./index.css";


function App() {
  return (
    <>
      <section className="flex gap-6">
        <SideBar/>
        <Note/>
      </section>
    </>
  )
}

export default App

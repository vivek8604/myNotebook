
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
function App() {
  return (
    <>
 <NoteState>
    <BrowserRouter>
  <Navbar/>
      <Routes>
          <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />}/>
          <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </NoteState>

    </>
  );
}

export default App;

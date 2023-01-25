
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>

  <BrowserRouter>
  <Navbar/>
      <Routes>
          <Route exact path="/home" element={<Home />} />
        <Route exact path="/about" element={<About />}/>
          <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import { ItemListContainer } from "./views/ItemListContainer";
import { NavBar } from "./components/NavBar";
import { Contact } from "./views/Contact";
import { Home } from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ItemListContainer />} />
          <Route path="/categoria/:id" element={<ItemListContainer />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

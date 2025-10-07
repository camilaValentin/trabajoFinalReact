import "./App.css";
import { ItemListContainer } from "./views/ItemListContainer";
import { NavBar } from "./components/NavBar";
import { Contact } from "./views/Contact";
import { Home } from "./views/Home";
import { Error404 } from "./views/Error404";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

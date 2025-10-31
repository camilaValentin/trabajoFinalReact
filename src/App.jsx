import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./views/ItemListContainer";
import { ItemDetailContainer } from "./components/item/ItemDetailContainer";
import { Cart } from "./components/cart/Cart";
import { Error404 } from "./views/Error404";

import { CartProvider } from "./components/cart/CartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenido a Mima Petshop" />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/products/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

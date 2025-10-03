import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Carrito } from "./CartWidget";
import "../App.css";
import data from "../data/products.json";

export const NavBar = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  const categories = data.products.map((item) => item.category);
  const uniqueCategories = [...new Set(categories)];

  const fetchProducts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.products) {
          resolve(data.products);
        } else {
          reject("No se encontraron productos");
        }
      }, 1000);
    });
  };

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (categoryId) {
          const filtered = data.filter(
            (product) => product.category === categoryId
          );
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => console.error(error));
  }, [categoryId]);

  return (
    <nav className="navbar navbar-expand-lg w-100 navbar-custom">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src="logo.png" alt="Logo empresa" className="logo" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>

            {uniqueCategories.map((cat, index) => (
              <li className="nav-item" key={index}>
                <NavLink className="nav-link" to={`/category/${cat}`}>
                  {cat}
                </NavLink>
              </li>
            ))}

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contacto
              </NavLink>
            </li>
          </ul>

          <div className="d-flex">
            <Carrito />
          </div>
        </div>
      </div>
    </nav>
  );
};

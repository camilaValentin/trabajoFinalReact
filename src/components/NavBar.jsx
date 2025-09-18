import { Carrito } from "./CartWidget";
import "../App.css";

export const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top w-100 navbar-custom">
        <div className="container-fluid">
          <img src="logo.png" alt="Logo empresa" className="logo" />
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
                <a className="nav-link active" aria-current="page" href="#">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Catálogo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Nosotros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Envios
                </a>
              </li>
              <li className="nav-item"></li>
            </ul>
            <div className="d-flex">
              <Carrito />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

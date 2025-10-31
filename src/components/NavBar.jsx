// src/components/NavBar.jsx
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { CartWidget } from "./cart/CartWidget"
import "../App.css"

export const NavBar = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const snap = await getDocs(collection(db, "items"))
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        const cats = Array.from(new Set(all.map(p => p.categoryId))).filter(Boolean)
        setCategories(cats)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  return (
    <nav className="navbar navbar-expand-lg w-100 navbar-custom fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src="/logo.png" alt="Logo empresa" className="logo" />
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
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>

            {loading ? (
              <li className="nav-item">
                <span className="nav-link disabled">Cargando categorías…</span>
              </li>
            ) : (
              categories.map(cat => (
                <li className="nav-item" key={cat}>
                  <NavLink
                    className="nav-link"
                    to={`/category/${encodeURIComponent(cat)}`}
                  >
                    {cat}
                  </NavLink>
                </li>
              ))
            )}
          </ul>

          <div className="d-flex">
            <CartWidget />
          </div>
        </div>
      </div>
    </nav>
  )
}

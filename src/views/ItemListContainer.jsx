import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Spinner } from "react-bootstrap"
import {
  collection,
  query,
  where,
  onSnapshot
} from "firebase/firestore"
import { db } from "../firebase"
import { ItemList } from "../components/item/ItemList"

export const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams() 

  useEffect(() => {
    setLoading(true)
    setError(null)

    let q

    if (id) {
      const category = decodeURIComponent(id).trim()
      q = query(collection(db, "items"), where("categoryId", "==", category))
    } else {
      q = collection(db, "items")
    }

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        if (snapshot.empty) {
          setItems([])
          setError("No hay productos disponibles")
        } else {
          const productos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setItems(productos)
        }
        setLoading(false)
      },
      err => {
        console.error(err)
        setError("Error al obtener los productos")
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [id])

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p style={{ color: "red" }}>{error}</p>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      {greeting && <h1 className="text-center mb-4">{greeting}</h1>}
      <ItemList items={items} />
    </Container>
  )
}

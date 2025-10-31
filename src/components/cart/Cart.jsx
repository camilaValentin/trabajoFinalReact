import { useState, useContext } from "react"
import { collection, addDoc } from "firebase/firestore"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"

import { db } from "../../firebase" // 🔹 Importa tu db ya inicializada
import { CartContext } from "./CartContext"

export const Cart = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
  })

  const { productosAgregados = [], deleteItem, clear } = useContext(CartContext) || {}

  const total = () =>
    productosAgregados.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    )

  const handleChange = ev => {
    setFormValues(prev => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }))
  }

  const sendOrder = async () => {
    if (productosAgregados.length === 0) {
      alert("El carrito está vacío")
      return
    }

    const order = {
      buyer: formValues,
      items: productosAgregados,
      total: total(),
      date: new Date(),
    }

    try {
      const orderCollection = collection(db, "orders")
      const docRef = await addDoc(orderCollection, order)
      clear()
      alert(`Su orden ${docRef.id} ha sido completada!`)
    } catch (error) {
      console.error("Error al enviar la orden:", error)
      alert("Ocurrió un error al enviar la orden.")
    }
  }

  return (
    <Container className="mt-4">
      <h1>Lista productos</h1>
      {!productosAgregados || productosAgregados.length === 0 ? (
        <mark>No hay productos</mark>
      ) : (
        <>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Nombre</th>
                <th></th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productosAgregados.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.title}</td>
                  <td>
                    <img
                      height={60}
                      src={producto.imageId}
                      alt={producto.title}
                    />
                  </td>
                  <td>{producto.price}</td>
                  <td>{producto.quantity}</td>
                  <td>
                    <Button onClick={() => deleteItem(producto.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td></td>
                <td>{total()}</td>
                <td></td>
              </tr>
            </tfoot>
          </Table>

          <h2>Ingresar datos de usuario</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tel</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="button" onClick={sendOrder}>
              Enviar pedido
            </Button>
          </Form>
        </>
      )}
    </Container>
  )
}

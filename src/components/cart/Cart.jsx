import { useState, useContext } from "react"
import { CartContext } from "./CartContext"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap"
import { getFirestore, collection, addDoc } from "firebase/firestore"

export const Cart = () => {
  const { productosAgregados, addItem, decreaseItem, deleteItem, clear, clearWithoutRestock } = useContext(CartContext)
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" })
  const [sending, setSending] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [toast, setToast] = useState({ show: false, msg: "", variant: "light" })

  const total = () =>
    productosAgregados.reduce(
      (acumulador, item) => acumulador + item.quantity * item.price,
      0
    )

  const handleQuantityChange = async (producto, change) => {
    if (change < 0) {
      await decreaseItem(producto)
      setToast({
        show: true,
        msg: `Se quitó una unidad de ${producto.name}`,
        variant: "light",
      })
    } else {
      const res = await addItem(producto, 1)
      if (!res.ok) {
        setToast({
          show: true,
          msg: res.error || "No hay suficiente stock disponible.",
          variant: "danger",
        })
      } else {
        setToast({
          show: true,
          msg: `${producto.name} actualizado correctamente.`,
          variant: "light",
        })
      }
    }
  }

  const handleInputChange = e => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value })
  }

  const handleCheckout = async () => {
    if (!buyer.name || !buyer.email || !buyer.phone) {
      setToast({
        show: true,
        msg: "Completá tus datos antes de finalizar la compra.",
        variant: "danger",
      })
      return
    }

    const db = getFirestore()
    const orderCollection = collection(db, "orders")
    const order = {
      buyer,
      items: productosAgregados,
      total: total(),
      date: new Date(),
    }

    setSending(true)
    try {
      const response = await addDoc(orderCollection, order)
      setOrderId(response.id)
      clearWithoutRestock()
      setToast({
        show: true,
        msg: "Compra realizada con éxito",
        variant: "success",
      })
    } catch (error) {
      console.error("Error al procesar la orden:", error)
      setToast({
        show: true,
        msg: "Ocurrió un error al procesar la compra.",
        variant: "danger",
      })
    } finally {
      setSending(false)
    }
  }

  if (orderId) {
    return (
      <Container className="text-center mt-5">
        <h2 className="mb-4">¡Gracias por tu compra, {buyer.name || "cliente"}!</h2>
        <p>Tu orden fue generada correctamente.</p>
        <p className="fw-bold">
          ID de orden: <span style={{ color: "#007bff" }}>{orderId}</span>
        </p>
        <p>Te enviamos un correo con los detalles.</p>
        <Button variant="primary" href="/">
          Volver al inicio
        </Button>
      </Container>
    )
  }

  if (!productosAgregados.length) {
    return (
      <Container className="text-center mt-5">
        <h2>Tu carrito está vacío</h2>
        <p>Agregá productos para verlos acá.</p>
        <Button href="/" variant="primary">
          Volver a la tienda
        </Button>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Row>
        <Col lg={8}>
          <h2 className="mb-4">Tu carrito</h2>
          {productosAgregados.map(producto => (
            <Card key={producto.id} className="mb-3 shadow-sm border-0">
              <Row className="g-0 align-items-center">
                <Col md={3}>
                  <Card.Img
                    src={producto.imageId}
                    alt={producto.name}
                    className="img-fluid rounded-start"
                    style={{ height: "140px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={9}>
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <Card.Title>{producto.name}</Card.Title>
                      <Card.Text className="text-muted mb-1">{producto.description}</Card.Text>
                      <Card.Text className="fw-bold">
                        ${producto.price.toLocaleString()}
                      </Card.Text>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(producto, -1)}
                          disabled={producto.quantity <= 1}
                        >
                          −
                        </Button>
                        <span className="fw-bold">{producto.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleQuantityChange(producto, 1)}
                          disabled={producto.quantity >= producto.stock}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteItem(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="outline-secondary" onClick={clear}>
              Vaciar carrito
            </Button>
          </div>
        </Col>
        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: "6rem" }}>
            <Card.Body>
              <h4 className="mb-3">Resumen de compra</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${total().toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                <span>Total</span>
                <span>${total().toLocaleString()}</span>
              </div>
              <Form className="mt-4">
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={buyer.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={buyer.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={buyer.phone}
                    onChange={handleInputChange}
                    placeholder="Ej: 1123456789"
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  className="w-100"
                  size="lg"
                  disabled={sending}
                  onClick={handleCheckout}
                >
                  {sending ? "Procesando compra..." : "Finalizar compra"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast
          bg={toast.variant}
          onClose={() => setToast(s => ({ ...s, show: false }))}
          show={toast.show}
          delay={2000}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Carrito</strong>
          </Toast.Header>
          <Toast.Body>{toast.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  )
}

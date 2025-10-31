import { useState, useContext, useMemo } from "react"
import { Button, InputGroup, Form, Toast, ToastContainer } from "react-bootstrap"
import { CartContext } from "./CartContext"

export const AddToCartButton = ({ product, defaultQty = 1 }) => {
  const { addItem } = useContext(CartContext)
  const [qty, setQty] = useState(defaultQty)
  const [showToast, setShowToast] = useState(false)

  const max = useMemo(() => (Number(product?.stock) > 0 ? Number(product.stock) : 1), [product?.stock])
  const disabled = product?.stock === 0

  const inc = () => setQty(q => Math.min(q + 1, max))
  const dec = () => setQty(q => Math.max(q - 1, 1))
  const onChange = e => {
    const v = Number(e.target.value || 1)
    if (!Number.isNaN(v)) setQty(Math.min(Math.max(v, 1), max))
  }
  const handleAdd = () => {
    if (!product?.id) return
    addItem(product, qty)
    setShowToast(true)
  }

  return (
    <>
      <div className="d-grid gap-2 w-100">
        <div className="w-100">
          <label className="form-label mb-1" style={{ fontWeight: 600 }}>Cantidad</label>
          <InputGroup className="w-100">
            <Button variant="outline-secondary" onClick={dec} disabled={disabled}>−</Button>
            <Form.Control
              type="number"
              value={qty}
              onChange={onChange}
              min={1}
              max={max}
              disabled={disabled}
              style={{ textAlign: "center", fontWeight: 600 }}
            />
            <Button variant="outline-secondary" onClick={inc} disabled={disabled}>+</Button>
          </InputGroup>
          <div className="text-muted mt-1" style={{ fontSize: 12 }}>
            Stock disponible: {product?.stock ?? 0}
          </div>
        </div>

        <Button
          variant="primary"
          onClick={handleAdd}
          disabled={disabled}
          className="w-100"
          style={{ fontWeight: 600 }}
        >
          {disabled ? "Sin stock" : `Agregar al carrito (${qty})`}
        </Button>
      </div>

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast bg="light" onClose={() => setShowToast(false)} show={showToast} delay={1600} autohide>
          <Toast.Header closeButton>
            <strong className="me-auto">Carrito</strong>
            <small>✔ agregado</small>
          </Toast.Header>
          <Toast.Body>{qty}× <strong>{product?.name}</strong> agregado(s)</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

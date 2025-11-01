import { useState } from "react"
import { Button, InputGroup, Form } from "react-bootstrap"

export const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial)

  const increase = () => {
    if (count < stock) setCount(count + 1)
  }

  const decrease = () => {
    if (count > 1) setCount(count - 1)
  }

  const handleChange = e => {
    const value = Number(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= stock) {
      setCount(value)
    }
  }

  return (
    <div className="d-flex flex-column align-items-center gap-2 w-100">
      <InputGroup className="w-100">
        <Button variant="outline-secondary" onClick={decrease} disabled={count <= 1}>
          −
        </Button>
        <Form.Control
          type="number"
          min="1"
          max={stock}
          value={count}
          onChange={handleChange}
          style={{ textAlign: "center", fontWeight: 600 }}
        />
        <Button variant="outline-secondary" onClick={increase} disabled={count >= stock}>
          +
        </Button>
      </InputGroup>
      <Button
        variant="primary"
        disabled={stock === 0}
        onClick={() => onAdd(count)}
        className="w-100 fw-bold"
      >
        {stock === 0 ? "Sin stock" : `Agregar ${count} al carrito`}
      </Button>
      <p className="text-muted small mb-0">Stock disponible: {stock}</p>
    </div>
  )
}

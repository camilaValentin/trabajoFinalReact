import { useState, useContext } from "react"
import { Toast, ToastContainer } from "react-bootstrap"
import { CartContext } from "./CartContext"
import { ItemCount } from "../item/ItemCount"

export const AddToCartButton = ({ product }) => {
  const { addItem } = useContext(CartContext)
  const [toast, setToast] = useState({ show: false, msg: "", variant: "light" })

  const handleAdd = async quantity => {
    const res = await addItem(product, quantity)
    if (res.ok) {
      setToast({
        show: true,
        msg: `${quantity} × ${product.name} agregado(s) al carrito`,
        variant: "light",
      })
    } else {
      setToast({
        show: true,
        msg: res.error || "No hay suficiente stock disponible",
        variant: "danger",
      })
    }
  }

  return (
    <>
      <ItemCount stock={product.stock ?? 0} initial={1} onAdd={handleAdd} />

      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast
          bg={toast.variant}
          onClose={() => setToast(s => ({ ...s, show: false }))}
          show={toast.show}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Carrito</strong>
          </Toast.Header>
          <Toast.Body>{toast.msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

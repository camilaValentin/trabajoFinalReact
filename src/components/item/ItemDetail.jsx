import { useContext } from "react"
import { Button } from "react-bootstrap"
import { CartContext } from "../cart/CartContext" // <-- ajustá la ruta si difiere
import { AddToCartButton } from "../cart/AddToCartButton"

export const ItemDetail = ({ product }) => {
  const { addItem } = useContext(CartContext)
  if (!product) return null

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "left" }}>
      <h2>{product.name}</h2>
      <img
        src={product.imageId}
        alt={product.name}
        style={{ maxWidth: "100%", height: 300, objectFit: "contain" }}
      />
      <p style={{ marginTop: 12 }}>{product.description}</p>
      <p><strong>Categoría:</strong> {product.categoryId}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>

      <div className="d-flex align-items-center gap-3 mt-3">
        <AddToCartButton product={product} defaultQty={1} />
      </div>
    </div>
  )
}

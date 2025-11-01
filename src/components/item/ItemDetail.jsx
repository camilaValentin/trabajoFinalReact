import { AddToCartButton } from "../cart/AddToCartButton"

export const ItemDetail = ({ product }) => {
  if (!product) return <p>Cargando...</p>

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <img src={product.imageId} alt={product.name} width={300} className="mb-3" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="fw-bold">${product.price.toLocaleString()}</p>

      <AddToCartButton product={product} />
    </div>
  )
}

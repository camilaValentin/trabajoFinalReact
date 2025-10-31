import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AddToCartButton } from "../cart/AddToCartButton"

export const ItemList = ({ items }) => {
  return (
    <div className="item-list-container">
      {items.map(product => (
        <Card key={product.id} className="product-card d-flex flex-column">
          <div className="image-container">
            <Card.Img src={product.imageId} alt={product.name} />
          </div>

          <Card.Body className="d-flex flex-column">
            <Card.Title>{product.name}</Card.Title>
            <Card.Text className="flex-grow-1">{product.description}</Card.Text>
            <Card.Text className="text-muted">{product.categoryId}</Card.Text>
            <Card.Text className="text-muted">${product.price}</Card.Text>

            <Link to={`/products/${product.id}`} className="mt-auto">
              <Button variant="outline-primary" className="w-100 mb-2">
                Ver detalle
              </Button>
            </Link>

            <AddToCartButton product={product} defaultQty={1} />
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

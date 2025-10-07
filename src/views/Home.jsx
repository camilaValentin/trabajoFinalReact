import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

import productsData from "../data/products.json";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchProducts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productsData) {
          resolve(productsData);
        } else {
          reject("Error al cargar productos");
        }
      }, 1000);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((response) => {
        if (!id) {
          setProducts(response);
        } else {
          const filtered = response.filter(
            (product) => product.category === id
          );
          setProducts(filtered);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return "Cargando...";
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Bienvenido a Mima Petshop</h1>
      <Container className="d-flex flex-wrap justify-content-center gap-4">
        {products.map((product) => (
          <Card key={product.id} className="product-card d-flex flex-column">
            <div className="image-container">
              <Card.Img variant="top" src={product.image} alt={product.name} />
            </div>
            <Card.Body className="d-flex flex-column">
              <Card.Title>{product.name}</Card.Title>
              <Card.Text className="flex-grow-1">
                {product.description}
              </Card.Text>
              <Card.Text className="text-muted">{product.category}</Card.Text>
              <Link to={`/products/${product.id}`} className="mt-auto">
                <Button variant="primary" className="w-100">
                  Ver detalle
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Container>
  );
};

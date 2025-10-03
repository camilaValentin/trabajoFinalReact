import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

import productsData from "../data/products.json";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  const fetchProducts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (productsData.products) {
          resolve(productsData.products);
        } else {
          reject("No se encontraron productos");
        }
      }, 1000);
    });
  };

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (categoryId) {
          const filtered = data.filter(
            (product) => product.category === categoryId
          );
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => console.error(error));
  }, [categoryId]);

  return (
    <Container>
      <h1>Bienvenido a Mima Petshop</h1>
      <Container className="d-flex flex-wrap">
        {products.map((product) => (
          <Card key={product.id} style={{ flex: 1 }}>
            <Card.Img variant="top" src={product.image} height="200" />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>{product.category}</Card.Text>
              <Link to={`/products/${product.id}`}>
                <Button variant="primary">Ver detalle</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Container>
  );
};

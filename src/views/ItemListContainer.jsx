import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";

export const ItemListContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchProduct = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = products.find((p) => p.id === Number(id));
        if (found) {
          resolve(found);
        } else {
          reject("Producto no encontrado");
        }
      }, 1000);
    });
  };
  useEffect(() => {
    fetchProduct(id)
      .then((res) => setProduct(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return "Cargando...";
  }
  if (!product) {
    return "No se encontró el producto";
  }

  return (
    <main>
      {" "}
      <h1>Detalle del producto:</h1> <h2>{product.name}</h2>{" "}
      <img width={300} src={product.image} alt={product.name} />{" "}
      <p>{product.description}</p>{" "}
    </main>
  );
};

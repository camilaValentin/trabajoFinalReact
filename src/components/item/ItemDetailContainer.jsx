import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { ItemDetail } from "./ItemDetail";

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const ref = doc(db, "items", id);

    const unsubscribe = onSnapshot(
      ref,
      snapshot => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
          setError(null);
        } else {
          setError("El producto no existe.");
        }
        setLoading(false);
      },
      err => {
        console.error(err);
        setError("Error al cargar el producto.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando producto...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p style={{ color: "red" }}>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <ItemDetail product={product} />
    </Container>
  );
};

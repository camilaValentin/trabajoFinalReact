import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
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
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const snap = await getDoc(doc(db, "items", id));
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() });
        } else {
          setError("El producto no existe.");
        }
      } catch {
        setError("Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
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

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { ItemList } from "../components/item/ItemList";

export const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          const snap = await getDocs(collection(db, "items"));
          const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          if (data.length === 0) setError("No hay productos disponibles");
          setItems(data);
          return;
        }

        const category = decodeURIComponent(id).trim();
        const q = query(collection(db, "items"), where("categoryId", "==", category));
        const qsnap = await getDocs(q);

        if (qsnap.empty) {
          setItems([]);
          setError(`No hay productos en la categoría "${category}"`);
        } else {
          setItems(qsnap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } catch {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando...</span>
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
    <Container className="py-4">
      {greeting && <h1 className="text-center mb-4">{greeting}</h1>}
      <ItemList items={items} />
    </Container>
  );
};

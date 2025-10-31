import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import Button from "react-bootstrap/Button";

export const CartWidget = () => {
  const { productosAgregados } = useContext(CartContext);

  const totalQuantity = (productosAgregados || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <Link
      to="/cart"
      style={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          backgroundColor: "#f0e2ca", 
          color: "black",
          display: "flex",
          alignItems: "center",
          padding: "8px",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        <img
          src="/cart.png"
          alt="Carrito de compras"
          style={{ width: "35px", height: "35px", marginRight: "8px" }}
        />
        {totalQuantity > 0 && <span>{totalQuantity}</span>}
      </div>

      {totalQuantity > 0 && (
        <Button variant="primary" style={{
          backgroundColor: "#f0e2ca", 
          color: "black",
          display: "flex",
          alignItems: "center",
          padding: "8px",
          borderRadius: "10px",
          fontWeight: "bold",
        }}>
          Terminar mi compra
        </Button>
      )}
    </Link>
  );
};

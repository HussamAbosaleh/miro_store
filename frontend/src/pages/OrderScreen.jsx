import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function OrderScreen() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await res.json();
      setOrder(data);
    };

    fetchOrder();
  }, [id, user]);

  if (!order) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Order Details</h2>

      {order.orderItems.map((item) => (
        <div key={item.product + item.size}>
          <h4>{item.name}</h4>
          <p>Size: {item.size}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price} €</p>
        </div>
      ))}

      <h3>Total: {order.totalPrice} €</h3>
      <p>Payment: {order.isPaid ? "Paid" : "Not Paid"}</p>
      <p>Delivery: {order.isDelivered ? "Delivered" : "Not Delivered"}</p>
    </div>
  );
}

export default OrderScreen;
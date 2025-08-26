// AdminPanel.js
import { useEffect, useState } from "react";

export default function Admin_Order() {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/getorders");
    const data = await res.json();
    setOrders(data);
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/getorders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrders(); // refresh list
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Orders Admin Panel</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Order ID</th>
            <th className="p-2">Product</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="p-2">{order.orderId}</td>
              <td className="p-2">{order.productName}</td>
              <td className="p-2">{order.address.name} ,{order.address.email} ,{order.address.mobile},{order.address.pincode} ,{order.address.state}
                 ,{order.address.district} ,{order.address.town} ,{order.address.landmark},{order.address.streetNo} ,{order.address.houseNo}  </td>
              <td className="p-2">{order.quantity}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

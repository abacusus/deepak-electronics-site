import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    fetch("http://localhost:5000/getproducts") 
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.productId}
          className="bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-xl transition"
        >
          <img
            src={product.images?.[0] || "https://via.placeholder.com/200"}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500 text-sm">{product.category}</p>
            <p className="mt-2 text-xl font-bold text-green-600">
              ₹{product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${product.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="p-6">Loading product details...</p>;

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-80 object-cover rounded-2xl shadow"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.category}</p>
          <p className="text-primary-600 text-2xl font-semibold mt-4">
            ₹{product.price}
          </p>
          <p className="mt-6 text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

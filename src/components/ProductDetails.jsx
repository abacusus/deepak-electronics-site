import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams(); // id = productId 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/getproducts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
  {/* Header */}
  <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
  <p className="text-gray-500 mb-8">Category: {product.category}</p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/*  Images */}
    <div className="flex flex-col gap-4">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-80 object-contain rounded-xl shadow-md"
      />
      <div className="flex gap-2 overflow-x-auto">
        {product.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.name}-${i}`}
            className="w-24 h-24 object-contain border rounded-lg cursor-pointer hover:scale-105 transition"
          />
        ))}
      </div>
    </div>

    {/*  Product Details */}
    <div className="space-y-4">
      <p className="text-2xl font-bold text-primary-600">₹{product.price}</p>
      <p className="text-gray-700">{product.description}</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <p><span className="font-semibold">Weighing Capacity:</span> {product.weighingCapacity}</p>
        <p><span className="font-semibold">Brand:</span> {product.brand}</p>
        <p><span className="font-semibold">Usage Application:</span> {product.usageApplication}</p>
        <p><span className="font-semibold">Material:</span> {product.material}</p>
        <p><span className="font-semibold">Model Number:</span> {product.modelNumber}</p>
        <p><span className="font-semibold">Calibration:</span> {product.calibration}</p>
        <p><span className="font-semibold">Display Type:</span> {product.displayType}</p>
        <p><span className="font-semibold">Pan Size:</span> {product.panSize}</p>
        <p><span className="font-semibold">Accuracy:</span> {product.accuracy}</p>
        <p><span className="font-semibold">Automation Grade:</span> {product.automationGrade}</p>
        <p><span className="font-semibold">Warranty:</span> {product.warranty}</p>
        <p><span className="font-semibold">Display Color:</span> {product.displayColor}</p>
        <p><span className="font-semibold">Deal In:</span> {product.dealIn}</p>
        <p><span className="font-semibold">Power Supply:</span> {product.powerSupply}</p>
        <p><span className="font-semibold">Frequency:</span> {product.frequency}</p>
        <p><span className="font-semibold">Number of Digits:</span> {product.numberOfDigits}</p>
        <p><span className="font-semibold">Humidity:</span> {product.humidity}</p>
        <p><span className="font-semibold">Color:</span> {product.color}</p>
        <p><span className="font-semibold">Battery Type:</span> {product.batteryType}</p>
        <p><span className="font-semibold">Size:</span> {product.size}</p>
        <p><span className="font-semibold">Stock:</span> {product.stock}</p>
      </div>

      <button className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-2xl shadow hover:bg-primary-700 transition">
        Add to Cart
      </button>
    </div>
  </div>
</div>

  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/getproducts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.images?.[0] || null);
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        {product.name}
      </h1>
      <p className="text-gray-500 mb-10 text-lg">Category: {product.category}</p>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          
          <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center shadow">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-96 object-contain rounded-lg"
            />
          </div>

          
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name}-${i}`}
                className={`w-20 h-20 object-contain border-2 rounded-lg cursor-pointer transition ${
                  selectedImage === img
                    ? "border-primary-600 shadow-lg"
                    : "border-gray-200 hover:border-primary-400"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Price & Stock */}
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-primary-600">
              ₹{product.price}
            </p>
            <p
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </p>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          )}

         
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <p><span className="font-semibold">Weighing Capacity:</span> {product.weighingCapacity}</p>
            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold">Usage:</span> {product.usageApplication}</p>
            <p><span className="font-semibold">Material:</span> {product.material}</p>
            <p><span className="font-semibold">Model:</span> {product.modelNumber}</p>
            <p><span className="font-semibold">Calibration:</span> {product.calibration}</p>
            <p><span className="font-semibold">Display:</span> {product.displayType}</p>
            <p><span className="font-semibold">Pan Size:</span> {product.panSize}</p>
            <p><span className="font-semibold">Accuracy:</span> {product.accuracy}</p>
            <p><span className="font-semibold">Automation:</span> {product.automationGrade}</p>
            <p><span className="font-semibold">Warranty:</span> {product.warranty}</p>
            <p><span className="font-semibold">Color:</span> {product.color}</p>
            <p><span className="font-semibold">Battery:</span> {product.batteryType}</p>
            <p><span className="font-semibold">Size:</span> {product.size}</p>
            <p><span className="font-semibold">Digits:</span> {product.numberOfDigits}</p>
            <p><span className="font-semibold">Power:</span> {product.powerSupply}</p>
          </div>

          {/* CTA */}
<button
  disabled={product.stock <= 0}
  className={`mt-6 w-full py-3 text-lg font-black rounded-xl shadow-lg transition-transform duration-200 
    ${
      product.stock > 0
        ? "bg-indigo-500 text-black hover:from-primary-700 hover:to-primary-600 hover:scale-105"
        : "bg-red-300 text-gray-500 cursor-not-allowed"
    }`}
>
  {product.stock > 0 ? "🛒 Order Now" : "Out of Stock"}
</button>

        </div>
      </div>
    </div>
  );
}

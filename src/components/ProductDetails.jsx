import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    alternateMobile: "",
    houseNo: "",
    streetNo: "",
    landmark: "",
    town: "",
    district: "",
    state: "",
    pincode: "",
    quantity: 1,
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const orderData = {
      productId: product.productId,
      productName: product.name,
      quantity: formData.quantity,
      address: {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        alternateMobile: formData.alternateMobile,
        houseNo: formData.houseNo,
        streetNo: formData.streetNo,
        landmark: formData.landmark,
        town: formData.town,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
      },
    };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const data = await res.json();
  alert(`✅ Order placed successfully!\n🆔 Order ID: ${data.orderId}`);
        setShowPopup(false);
      } else {
        alert("❌ Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong");
    }
  };

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
                    ? "border-indigo-600 shadow-lg"
                    : "border-gray-200 hover:border-indigo-400"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-indigo-600">
              ₹{product.price}
            </p>
            <p
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                product.stock > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </p>
          </div>

          {product.description && (
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Specs */}
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
            onClick={() => setShowPopup(true)}
            className={`mt-6 w-full py-3 text-lg font-black rounded-xl shadow-lg transition-transform duration-200 
              ${
                product.stock > 0
                  ? "bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-105"
                  : "bg-red-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {product.stock > 0 ? "🛒 Order Now" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/*  Popup  */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
              Order {product.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <input name="name" placeholder="Full Name" className="border p-2 rounded"
                onChange={handleChange} />
              <input name="email" type="email" placeholder="Email" className="border p-2 rounded"
                onChange={handleChange} />
              <input name="mobile" placeholder="Mobile No." className="border p-2 rounded"
                onChange={handleChange} />
              <input name="alternateMobile" placeholder="Alternate No." className="border p-2 rounded"
                onChange={handleChange} />
              <input name="houseNo" placeholder="House No." className="border p-2 rounded"
                onChange={handleChange} />
              <input name="streetNo" placeholder="Street No." className="border p-2 rounded"
                onChange={handleChange} />
              <input name="landmark" placeholder="Landmark" className="border p-2 rounded"
                onChange={handleChange} />
              <input name="town" placeholder="Town/College" className="border p-2 rounded"
                onChange={handleChange} />
              <input name="district" placeholder="District" className="border p-2 rounded"
                onChange={handleChange} />
              <input name="state" placeholder="State" className="border p-2 rounded"
                onChange={handleChange} />
              <input name="pincode" placeholder="Pincode" className="border p-2 rounded"
                onChange={handleChange} />
              <input type="number" name="quantity" value={formData.quantity} min="1"
                placeholder="Quantity" className="border p-2 rounded"
                onChange={handleChange} />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

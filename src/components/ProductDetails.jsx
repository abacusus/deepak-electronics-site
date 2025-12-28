import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RandomBackground from "./RandomBackground";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";


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



  function injectSchema(schema) {
  // Remove old schema
  const old = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (old) old.remove();

  // Inject new schema
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);

  document.head.appendChild(script);
  
}

useEffect(() => {
  fetch(`/api/getproducts/${id}`)
    .then((res) => res.json())
    .then((data) => {
    
      setProduct(data.product);
      setSelectedImage(data.product.images?.[0] || null);

      // schema 
      if (data.schema) {
        injectSchema(data.schema);
      }

      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, [id]);



// meta and title injector

useEffect(() => {
  if (!product) return;

  document.title = `${product.name} – Deepak Electronics`;

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "description";
    document.head.appendChild(meta);
  }
  meta.content = product.extraDescription;
}, [product]);






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
      const res = await fetch("/api/orders", {
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


    
<div className="relative w-full min-h-screen overflow-hidden">






  <RandomBackground />

  <TopHeader />
      <Navbar />

  <div className="max-w-7xl mx-auto px-6 py-12">
   

   <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      
    
      <div className="space-y-4">
        <div className="w-full h-[450px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center">
          <img
            src={selectedImage}
            alt={product.name}
            className="max-h-[420px] object-contain rounded-xl"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              onClick={() => setSelectedImage(img)}
              className={`w-24 h-24 object-contain cursor-pointer border rounded-xl transition-all duration-300 ${
                selectedImage === img
                  ? "border-purple-400 shadow-lg scale-105"
                  : "border-white/30 hover:border-purple-300 hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>

   
      <div className="space-y-6">
        
      
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl text-white">
          <div className="flex items-center justify-between">
            <p className="text-4xl font-extrabold text-purple-300 tracking-tight">
              ₹{product.price}
            </p>

            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                product.stock > 0
                  ? "bg-green-600/20 text-green-300 border border-green-400/30"
                  : "bg-red-600/20 text-red-300 border border-red-400/30"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </span>
          </div>
        </div>

     
        {product.description && (
          <p className="text-white/80 text-lg leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-md shadow-xl text-gray-500">
          {[
            ["Weighing Capacity", product.weighingCapacity],
            ["Brand", product.brand],
            ["Usage", product.usageApplication],
            ["Material", product.material],
            ["Model", product.modelNumber],
            ["Calibration", product.calibration],
            ["Display", product.displayType],
            ["Pan Size", product.panSize],
            ["Accuracy", product.accuracy],
            ["Automation", product.automationGrade],
            ["Warranty", product.warranty],
            ["Color", product.color],
            ["Battery", product.batteryType],
            ["Size", product.size],
            ["Digits", product.numberOfDigits],
            ["Power", product.powerSupply],
          ].map(
            ([label, value], i) =>
              value && (
                <p key={i} className="text-sm">
                  <span className="font-semibold text-purple-300">
                    {label}:
                  </span>{" "}
                  {value}
                </p>
              )
          )}
        </div>

        
        <button
          
          disabled={product.stock <= 0}
          onClick={() => setShowPopup(true)}
          className={`mt-6 w-full py-4 text-xl font-bold rounded-xl shadow-xl transition-all duration-300 ${
            product.stock > 0
              ? "bg-purple-400 text-black hover:bg-purple-300 hover:scale-[1.03]"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
        >
          {product.stock > 0 ? "⚡ Order Now" : "Out of Stock"}
        </button>
      </div>
    </div>


    <div className="mt-14 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">
      <h2 className="text-3xl font-bold text-white mb-4">About This Item</h2>

      {product.extraDescription && (
        <p className="text-white/80 text-lg mb-5">{product.extraDescription}</p>
      )}

      <ul className="space-y-3 text-white/90 text-lg">
        {(product.feature1 ||
          product.feature2 ||
          product.feature3 ||
          product.feature4 ||
          product.feature5) ? (
          <>
            {["feature1","feature2","feature3","feature4","feature5"].map(
              (f, i) =>
                product[f] && (
                  <li key={i} className="flex gap-2">
                    <span className="text-purple-300 text-xl">•</span>
                    {product[f]}
                  </li>
                )
            )}
          </>
        ) : (
          <>
            <li className="flex gap-2">
              <span className="text-purple-300 text-xl">•</span>
              High-quality material designed for long-term use.
            </li>
            <li className="flex gap-2">
              <span className="text-purple-300 text-xl">•</span>
              Smooth performance with fast processing.
            </li>
            <li className="flex gap-2">
              <span className="text-purple-300 text-xl">•</span>
              Lightweight and easy to use.
            </li>
            <li className="flex gap-2">
              <span className="text-purple-300 text-xl">•</span>
              Ideal for professional & daily tasks.
            </li>
            <li className="flex gap-2">
              <span className="text-purple-300 text-xl">•</span>
              Backed by reliable support and warranty.
            </li>
          </>
        )}
      </ul>
    </div>
  </div>

  
  {showPopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4">Order {product.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["name", "Full Name"],
            ["email", "Email"],
            ["mobile", "Mobile No."],
            ["alternateMobile", "Alternate No."],
            ["houseNo", "House No."],
            ["streetNo", "Street No."],
            ["landmark", "Landmark"],
            ["town", "Town"],
            ["district", "District"],
            ["state", "State"],
            ["pincode", "Pincode"],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
            />
          ))}

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            min="1"
            onChange={handleChange}
            className="p-3 border rounded-lg"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setShowPopup(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-400 text-black font-semibold rounded-lg hover:bg-purple-300"
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

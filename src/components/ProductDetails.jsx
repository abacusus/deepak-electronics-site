import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ShoppingCart,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  Weight,
  Maximize,
  Cpu,
  Activity,
  Monitor,
  Settings2,
  ShieldCheck,
  Palette,
  Battery,
  Zap,
  Info,
  MapPin,
  Phone,
  Mail,
  User,
  Home as HomeIcon,
  Flag,
  Globe,
  Navigation,
  Hash,
  X
} from "lucide-react";
import { useAlert } from "./AlertContext";
import RandomBackground from "./RandomBackground";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";

const ProductSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="aspect-square bg-slate-200 rounded-3xl w-full"></div>
        <div className="flex gap-4">
          {[1, 2, 3].map(i => <div key={i} className="w-24 h-24 bg-slate-200 rounded-2xl"></div>)}
        </div>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-10 bg-slate-200 rounded w-3/4"></div>
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        </div>
        <div className="h-32 bg-slate-200 rounded-2xl w-full"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-12 bg-slate-200 rounded-xl"></div>)}
        </div>
        <div className="h-14 bg-slate-200 rounded-2xl w-full"></div>
      </div>
    </div>
  </div>
);

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formStep, setFormStep] = useState(1);

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
    const old = document.querySelector('script[type="application/ld+json"]');
    if (old) old.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`/api/getproducts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setSelectedImage(data.product.images?.[0] || null);
        if (data.schema) injectSchema(data.schema);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} – Deepak Electronics`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = product.extraDescription || product.description;
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const orderData = {
      productId: product.productId,
      productName: product.name,
      quantity: formData.quantity,
      address: { ...formData },
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const data = await res.json();
        showAlert(`Order placed successfully! Order ID: ${data.orderId}`, "success");
        setShowPopup(false);
        setFormStep(1);
      } else {
        showAlert("Failed to place order. Please check your details.", "error");
      }
    } catch (error) {
      console.error(error);
      showAlert("Something went wrong. Please try again later.", "error");
    }
  };

  if (loading) return (
    <div className="relative w-full min-h-screen bg-slate-50">
      <RandomBackground />
      <TopHeader />
      <Navbar />
      <ProductSkeleton />
    </div>
  );

  if (!product) return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <AlertCircle className="w-16 h-16 text-slate-300 mb-4" />
      <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
      <button onClick={() => navigate('/products')} className="mt-4 text-indigo-600 font-bold hover:underline">Return to Shop</button>
    </div>
  );

  const specItems = [
    { label: "Capacity", value: product.weighingCapacity, icon: Weight },
    { label: "Brand", value: product.brand, icon: Layers },
    { label: "Application", value: product.usageApplication, icon: Activity },
    { label: "Material", value: product.material, icon: Package },
    { label: "Model", value: product.modelNumber, icon: Cpu },
    { label: "Calibration", value: product.calibration, icon: Settings2 },
    { label: "Display", value: product.displayType, icon: Monitor },
    { label: "Pan Size", value: product.panSize, icon: Maximize },
    { label: "Accuracy", value: product.accuracy, icon: Zap },
    { label: "Automation", value: product.automationGrade, icon: Cpu },
    { label: "Warranty", value: product.warranty, icon: ShieldCheck },
    { label: "Color", value: product.color, icon: Palette },
    { label: "Battery", value: product.batteryType, icon: Battery },
    { label: "Size", value: product.size, icon: Maximize },
    { label: "Digits", value: product.numberOfDigits, icon: Hash },
    { label: "Power", value: product.powerSupply, icon: Zap },
  ].filter(item => item.value);

  return (
    <div className="relative w-full min-h-screen bg-slate-50 overflow-x-hidden">
      <RandomBackground />
      <TopHeader />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb / Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium group"
        >
          <ChevronLeft className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Images */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex items-center justify-center p-12 group transition-all duration-500 hover:shadow-2xl">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              {/* Product Badge */}
              <div className="absolute top-6 left-6">
                <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg shadow-indigo-200">
                  Premium {product.category}
                </span>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 px-2 snap-x">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-start ${selectedImage === img
                    ? "border-indigo-600 ring-4 ring-indigo-50"
                    : "border-white hover:border-indigo-200 shadow-sm"
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-2 bg-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">{product.brand}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-slate-500 font-medium text-sm">{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-black text-indigo-600">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </div>
                <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${product.stock > 0
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-rose-50 text-rose-700 border-rose-100"
                  }`}>
                  {product.stock > 0 ? (
                    <><CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock})</>
                  ) : (
                    <><AlertCircle className="w-3.5 h-3.5" /> Out of Stock</>
                  )}
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white shadow-sm mb-8">
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  {product.description || "Premium weighing solution designed for high accuracy and long-term durability in professional environments."}
                </p>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {specItems.slice(0, 4).map((spec, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                  <div className="p-2.5 bg-indigo-50 rounded-xl">
                    <spec.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{spec.label}</p>
                    <p className="text-sm font-bold text-slate-700 line-clamp-1">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              disabled={product.stock <= 0}
              onClick={() => setShowPopup(true)}
              className={`group relative overflow-hidden w-full py-5 rounded-[2rem] text-xl font-black transition-all duration-500 shadow-xl ${product.stock > 0
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-1"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                {product.stock > 0 ? "⚡ Order Now" : "Currently Unavailable"}
              </span>
              {product.stock > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              )}
            </button>
          </div>
        </div>

        {/* Details & Specs Section */}
        <div className="mt-20 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-3xl font-black text-slate-900 border-l-8 border-indigo-600 pl-6 rounded-sm">Description</h2>
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm prose prose-indigo max-w-none text-slate-600 leading-relaxed text-lg">
                <p className="font-bold mb-4">{product.extraDescription}</p>
                <ul className="space-y-4 list-none p-0">
                  {["feature1", "feature2", "feature3", "feature4", "feature5"].map((key, i) => (
                    product[key] && (
                      <li key={i} className="flex gap-4 items-start translate-x-0 transition-transform hover:translate-x-2">
                        <div className="mt-1.5 p-1 bg-indigo-100 rounded-full flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="font-medium">{product[key]}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900 border-l-8 border-indigo-600 pl-6 rounded-sm">Technical Specs</h2>
              <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm space-y-6">
                {specItems.map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition-colors">
                      <spec.icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <div className="flex-grow pb-4 border-b border-slate-50 group-last:border-0">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{spec.label}</p>
                      <p className="text-sm font-bold text-slate-800">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Order Form Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowPopup(false)} />

          <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-springUp flex flex-col md:flex-row max-h-[90vh]">
            {/* Modal Left: Product Preview */}
            <div className="w-full md:w-80 bg-slate-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
              <img src={selectedImage} alt="" className="w-48 h-48 object-contain mb-6 drop-shadow-xl" />
              <div className="text-center">
                <h3 className="font-black text-slate-800 line-clamp-2 mb-2">{product.name}</h3>
                <p className="text-indigo-600 font-black text-xl">₹{Number(product.price).toLocaleString('en-IN')}</p>
              </div>

              <div className="mt-8 w-full space-y-3">
                <div className="p-3 bg-white rounded-2xl flex items-center justify-between border border-slate-200">
                  <span className="text-xs font-bold text-slate-400 uppercase">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold hover:bg-slate-200"
                    >-</button>
                    <span className="font-bold w-4 text-center">{formData.quantity}</span>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                      className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold hover:bg-slate-200"
                    >+</button>
                  </div>
                </div>
                <div className="p-3 bg-indigo-600 rounded-2xl flex items-center justify-between text-white">
                  <span className="text-xs font-bold text-indigo-100 uppercase">Total Bill</span>
                  <span className="font-black text-lg">₹{(product.price * formData.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Modal Right: Form */}
            <div className="flex-grow p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900">Checkout</h2>
                  <p className="text-slate-500 font-medium">Please provide your delivery details</p>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex gap-4 mb-10">
                <button
                  onClick={() => setFormStep(1)}
                  className={`flex-grow h-1.5 rounded-full transition-all duration-300 ${formStep >= 1 ? "bg-indigo-600" : "bg-slate-100"}`}
                />
                <button
                  onClick={() => formData.name && formData.mobile && setFormStep(2)}
                  className={`flex-grow h-1.5 rounded-full transition-all duration-300 ${formStep === 2 ? "bg-indigo-600" : "bg-slate-100"}`}
                />
              </div>

              <div className="space-y-8">
                {formStep === 1 ? (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="name" value={formData.name} onChange={handleChange} placeholder="Deepak Kumar" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="email" value={formData.email} onChange={handleChange} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Mobile Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+91 00000 00000" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Alternate Number</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} placeholder="Optional" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setFormStep(2)}
                      disabled={!formData.name || !formData.mobile}
                      className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Step: Delivery Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">House/Shop No.</label>
                        <div className="relative">
                          <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="houseNo" value={formData.houseNo} onChange={handleChange} placeholder="6" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Street/Area</label>
                        <div className="relative">
                          <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="streetNo" value={formData.streetNo} onChange={handleChange} placeholder="Railway Station Road" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Landmark</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Near Big Temple" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Town/City</label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="town" value={formData.town} onChange={handleChange} placeholder="Gurugram" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase ml-1">District</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="district" value={formData.district} onChange={handleChange} placeholder="Gurgaon" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">State</label>
                        <div className="relative">
                          <Flag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="state" value={formData.state} onChange={handleChange} placeholder="Haryana" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase ml-1">Pincode</label>
                        <div className="relative">
                          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                          <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="122001" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-600 transition-all outline-none font-medium" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setFormStep(1)}
                        className="flex-grow py-5 bg-slate-100 text-slate-600 rounded-[2rem] font-bold text-lg hover:bg-slate-200 transition-all font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.houseNo || !formData.town || !formData.district || !formData.pincode}
                        className="flex-[2] py-5 bg-indigo-600 text-white rounded-[2rem] font-bold text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🔥 Confirm Order Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAlert } from "./AlertContext";
import {
  Package,
  Settings,
  Layout,
  Info as InfoIcon,
  Image as ImageIcon,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  ClipboardList,
  Video,
  Edit,
  Search
} from "lucide-react";

const InputField = ({ label, name, type = 'text', placeholder, required = false, onChange, value }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || `Enter ${label}`}
      required={required}
      className="w-full bg-white/5 border border-slate-700/50 rounded-2xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 font-medium"
    />
  </div>
);

const TextAreaField = ({ label, name, placeholder, rows = 3, onChange, value }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-slate-700/50 rounded-2xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 font-medium"
    />
  </div>
);


export default function Admin() {
  const formRef = useRef(null);
  const { showAlert } = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/getproducts");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'images') {
      const urls = e.target.value ? e.target.value.split(',').map(url => url.trim()).filter(url => url) : [];
      setImageUrls(urls);
      setPreviewImages(urls);
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({ ...product, images: product.images?.join(', ') || "" });
    setImageUrls(product.images || []);
    setPreviewImages(product.images || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData({});
    setImageUrls([]);
    setPreviewImages([]);
    formRef.current.reset();
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      if (res.ok) {
        showAlert("Product deleted successfully", "success");
        fetchProducts();
      }
    } catch (err) {
      showAlert("Error deleting product", "error");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = { ...formData };
    data.price = Number(data.price) || 0;
    data.stock = Number(data.stock) || 0;
    data.numberOfDigits = Number(data.numberOfDigits) || 0;
    data.images = imageUrls;

    try {
      const url = editingProduct ? `/api/products/${editingProduct.productId}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to process request");

      showAlert(editingProduct ? "Product updated successfully!" : "Product added successfully to inventory!", "success");
      cancelEdit();
      fetchProducts();
    } catch (err) {
      console.error(err);
      showAlert("Error processing request. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-[#0f172a] min-h-screen p-4 md:p-12 font-sans selection:bg-indigo-500/30">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[35%] h-[35%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-500/20">
                <Settings className="w-8 h-8 text-white animate-spin-slow" />
              </div>
              {editingProduct ? "Revise Portfolio" : "Inventory Control"}
            </h1>
            <p className="text-slate-400 font-medium ml-1">
              {editingProduct ? `Updating: ${editingProduct.name}` : "Manage your precision weighing equipment database"}
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/admin_order"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-slate-700/50 text-white rounded-[2rem] transition-all duration-300 hover:bg-white/10 hover:border-slate-500"
            >
              <ClipboardList className="w-5 h-5 text-indigo-400" />
              <span className="font-bold">Orders</span>
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link
              to="/admin_video"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-slate-700/50 text-white rounded-[2rem] transition-all duration-300 hover:bg-white/10 hover:border-slate-500"
            >
              <Video className="w-5 h-5 text-purple-400" />
              <span className="font-bold">Videos</span>
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
          {/* Main Grid: Left for Inputs, Right for Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            <div className="lg:col-span-2 space-y-10">
              {/* Core Information Section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                    <Layout className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Product Basics</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Product Name" name="name" required placeholder="e.g. Table Top Scale" value={formData.name || ""} onChange={handleInputChange} />
                  <InputField label="Brand Name" name="brand" required placeholder="e.g. Deepak Electronics" value={formData.brand || ""} onChange={handleInputChange} />

                  <div className="space-y-1.5 md:col-span-2">
                    <label htmlFor="category" className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      Product Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#1e293b] border border-slate-700/50 rounded-2xl py-3 px-4 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 appearance-none transition-all font-medium"
                    >
                      <option value="" className="bg-[#1e293b]">Choose Classification</option>
                      {["Commercial Scales", "Industrial", "Jewellery", "Lifestyle", "Medical", "Retail", "Test Weights", "Waterproof"].map(cat => (
                        <option key={cat} value={cat} className="bg-[#1e293b]">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <TextAreaField label="Product Teaser (Short Description)" name="description" placeholder="A brief, engaging summary..." rows={2} value={formData.description || ""} onChange={handleInputChange} />
                  <TextAreaField label="Full Specification Description" name="extraDescription" placeholder="Detailed technical features..." rows={3} value={formData.extraDescription || ""} onChange={handleInputChange} />
                </div>
              </div>

              {/* Technical Specifications Section */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-purple-600"></div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-purple-500/10 rounded-xl">
                    <Settings className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Technical Data</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputField label="Model Number" name="modelNumber" placeholder="e.g. DT-2024" value={formData.modelNumber || ""} onChange={handleInputChange} />
                  <InputField label="Max Capacity" name="weighingCapacity" required placeholder="e.g. 50KG" value={formData.weighingCapacity || ""} onChange={handleInputChange} />
                  <InputField label="Accuracy / Precision" name="accuracy" placeholder="e.g. 1g" value={formData.accuracy || ""} onChange={handleInputChange} />
                  <InputField label="Build Material" name="material" placeholder="e.g. Stainless Steel" value={formData.material || ""} onChange={handleInputChange} />
                  <InputField label="Display Module" name="displayType" placeholder="e.g. Red LED" value={formData.displayType || ""} onChange={handleInputChange} />
                  <InputField label="Platform Size" name="panSize" placeholder="e.g. 300 x 300 mm" value={formData.panSize || ""} onChange={handleInputChange} />
                  <InputField label="Power Source" name="powerSupply" placeholder="e.g. AC 220V" value={formData.powerSupply || ""} onChange={handleInputChange} />
                  <InputField label="Unit Color" name="color" placeholder="e.g. Silver" value={formData.color || ""} onChange={handleInputChange} />
                </div>
              </div>

              {/* Advanced Attributes */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-slate-500/10 rounded-xl">
                    <InfoIcon className="w-6 h-6 text-slate-400" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Additional Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <InputField label="Feature 1" name="feature1" value={formData.feature1 || ""} onChange={handleInputChange} />
                  <InputField label="Feature 2" name="feature2" value={formData.feature2 || ""} onChange={handleInputChange} />
                  <InputField label="Feature 3" name="feature3" value={formData.feature3 || ""} onChange={handleInputChange} />
                  <InputField label="Feature 4" name="feature4" value={formData.feature4 || ""} onChange={handleInputChange} />
                  <InputField label="Feature 5" name="feature5" value={formData.feature5 || ""} onChange={handleInputChange} />
                  <InputField label="Warranty Period" name="warranty" placeholder="e.g. 1 Year" value={formData.warranty || ""} onChange={handleInputChange} />
                </div>

                <div className="p-6 bg-slate-800/50 rounded-3xl border border-white/5">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Inventory & Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Selling Price (₹)" name="price" type="number" required placeholder="0.00" value={formData.price || ""} onChange={handleInputChange} />
                    <InputField label="Current Stock" name="stock" type="number" placeholder="Quantities in warehouse" value={formData.stock || ""} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Image Management & Previews */}
            <div className="space-y-10">
              <div className="sticky top-10 space-y-10">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600"></div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                      <ImageIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h2 className="text-xl font-black text-white">Visual Assets</h2>
                  </div>

                  <TextAreaField
                    label="Image URLs (Separated by commas)"
                    name="images"
                    onChange={handleInputChange}
                    value={formData.images || ""}
                    placeholder="https://image1.jpg, https://image2.jpg"
                    rows={4}
                  />

                  <div className="mt-8 space-y-4">
                    <div className="text-[11px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Gallery Preview ({previewImages.length})
                    </div>

                    {previewImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                        {previewImages.map((src, idx) => (
                          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                            <img src={src} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                              <span className="text-[10px] font-bold text-white/80">Img {idx + 1}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-700/50 rounded-[2rem] text-slate-600">
                        <ImageIcon className="w-10 h-10 mb-2 opacity-20" />
                        <p className="text-[13px] font-bold">No images added</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full overflow-hidden py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${editingProduct ? 'bg-indigo-600 shadow-indigo-500/20 hover:bg-indigo-700' : 'bg-emerald-600 shadow-emerald-500/20 hover:bg-emerald-700'
                    }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4 text-white">
                    {isSubmitting ? (
                      <><Loader2 className="w-6 h-6 animate-spin" /> Processing...</>
                    ) : (
                      editingProduct ? <><CheckCircle2 className="w-6 h-6" /> Update Details</> : <><Plus className="w-6 h-6" /> Add to Portfolio</>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>

                {editingProduct && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="w-full py-4 text-slate-500 font-bold hover:text-white transition-colors"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Product Inventory List */}
        <div className="mt-24 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-4">
                <div className="p-2.5 bg-emerald-500/10 rounded-2xl">
                  <Layout className="w-6 h-6 text-emerald-400" />
                </div>
                Active Portfolio
              </h2>
              <p className="text-slate-500 font-bold ml-1 uppercase text-[10px] tracking-[0.2em] mt-2">Manage {products.length} catalog items</p>
            </div>

            <div className="relative group min-w-[300px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Lookup product by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-slate-700/50 rounded-[2rem] py-4 pl-16 pr-8 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(product => (
                <div key={product._id} className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 hover:bg-white/[0.08] transition-all duration-500 overflow-hidden">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-white p-3 flex-shrink-0">
                      <img src={product.images?.[0]} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-black bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full uppercase tracking-tighter self-start">
                          {product.category}
                        </span>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{product.brand}</span>
                      </div>
                      <h4 className="text-lg font-black text-white truncate group-hover:text-indigo-400 transition-colors">{product.name}</h4>
                      <p className="text-indigo-400 font-black text-sm mt-1">₹{Number(product.price).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Stock</p>
                        <p className={`text-sm font-black ${product.stock > 0 ? 'text-emerald-400' : 'text-rose-500'}`}>{product.stock}</p>
                      </div>
                      <div className="w-px h-6 bg-slate-700/50"></div>
                      <div className="text-center">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Orders</p>
                        <p className="text-sm font-black text-slate-300">{product.orderCount || 0}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="p-3 bg-white/5 hover:bg-indigo-600 text-slate-400 hover:text-white rounded-2xl transition-all duration-300"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.productId)}
                        className="p-3 bg-white/5 hover:bg-rose-600 text-slate-400 hover:text-white rounded-2xl transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

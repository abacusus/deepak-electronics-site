import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Eye, ArrowRight } from "lucide-react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import RandomBackground from "./RandomBackground";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[28rem] animate-pulse">
    <div className="h-64 bg-gray-200 w-full"></div>
    <div className="p-5 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="pt-4 h-8 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    document.title = category ? `${category} – Deepak Electronics` : "All Products – Deepak Electronics";

    let apiUrl = "/api/getproducts";
    if (category) {
      apiUrl += `?category=${encodeURIComponent(category)}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [location.search]);

  return (
    <div className="relative w-full min-h-screen bg-slate-50 overflow-x-hidden">
      <RandomBackground />
      <TopHeader />
      <Navbar />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-purple-200/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] bg-blue-200/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {new URLSearchParams(location.search).get("category") || "Featured Products"}
            </h1>
            <p className="mt-2 text-slate-600 font-medium">Discover our range of high-quality electronics and weighing solutions.</p>
          </div>
          <div className="text-sm font-semibold text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            Showing {products.length} products
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.productId}
                onClick={() => navigate(`/products/${product.productId}`)}
                className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden cursor-pointer flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] bg-slate-50/50 overflow-hidden p-8 flex items-center justify-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Eye className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-widest">
                      {product.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {product.brand}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-4 flex-grow">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</span>
                      <div className="text-xl font-black text-indigo-600">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="bg-indigo-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-100 group-hover:shadow-indigo-200 transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-slate-100">
            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-slate-300" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-3">No products found</h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg">
              We couldn't find any products in this category at the moment.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-100"
            >
              Browse All Products
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

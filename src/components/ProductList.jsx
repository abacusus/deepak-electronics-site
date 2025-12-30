import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import RandomBackground from "./RandomBackground";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
  
    const query = new URLSearchParams(location.search);
    const category = query.get("category"); 
    document.title = `${category} – Deepak Electronics`;

    
    let apiUrl = "/api/getproducts";
    if (category) {
      apiUrl += `?category=${encodeURIComponent(category)}`;
    }

    // Fetch 
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, [location.search]); 







  return (
    
      
      

      <div className="relative w-full min-h-screen overflow-hidden">
      
            
            <RandomBackground />
            <TopHeader />
      <Navbar />
              
      
       
       
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        

      
        <div className="relative max-w-8xl mx-auto px-3 py-2">
  <h1 className="text-[28px] sm:text-[32px] font-semibold text-gray-900 mb-1">
  All Products
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
    {products.map((product) => (
      <div
        key={product.productId}
        onClick={() => navigate(`/products/${product.productId}`)}
        className="
          bg-white rounded-2xl shadow-md hover:shadow-xl 
          cursor-pointer overflow-hidden border border-gray-200 
          transition-all duration-300 hover:-translate-y-10  h-[28rem] group
        "
      >
                <img

                
                  src={product.images[0]}
                  alt={product.name}
                  className=" w-full h-80 object-contain"
                />
                

                {/* Info  Div*/}
                <div className="p-4 bg-gray-100 group-hover:bg-gray-200 transition-colors">
                  <h3 className="text-[1.6rem] font-bold text-gray-600 group-hover:text-purple-500 transition-colors">{product.name}</h3>
                  

                  <p className="text-[0.75rem] font-bold text-gray-700">
                     {product.category}
                  </p>

                  <p className="text-[0.95rem] font-bold text-gray-700">By:
                     {product.brand}
                  </p>


                  <p className="text-primary-600  mt-2">
                     ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <p className="text-gray-500 mt-6">No products available.</p>
          )}
        </div>
      </div>
   
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/getproducts") 
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <TopHeader />
      <Navbar />

      {/* Background  */}
      <div className="relative min-h-screen bg-indigo-200 overflow-hidden">
       
        {/*  shapes */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        

        {/* Content wrapper */}
        <div className="relative max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold mb-6">Products Listed</h1>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.productId}
                className="bg-white rounded-3xl shadow-2xl hover:shadow-lg cursor-pointer overflow-hidden transition border-1"
                onClick={() => navigate(`/products/${product.productId}`)}
              >
                {/* Image */}
                <img

                
                  src={product.images[0]}
                  alt={product.name}
                  className=" w-full h-48 object-contain"
                />

                {/* Info  Div*/}
                <div className="p-4 bg-gray-200">
                  <h3 className="text-xl font-bold text-purple-600">{product.name}</h3>
                  <p className="text-l font-bold text-gray-700">
                     {product.category}
                  </p>
                  <p className="text-primary-600 font-bold mt-2">
                    Price: ₹{product.price}
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
    </>
  );
}

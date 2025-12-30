import React, { useRef,useState  } from 'react';
import { Link } from "react-router-dom";


const InputField = ({ label, name, type = 'text', placeholder, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder || `e.g., ${label}`}
      required={required}
      className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
    />
  </div>
);


const TextAreaField = ({ label, name, placeholder, rows = 3 }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
    />
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(false);
 
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const formData = new FormData(formRef.current);


    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/productvid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add product video");

      const result = await response.json();
      console.log(" Product video added:", result);
      alert("Product added successfully!");

     
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      alert(" Error adding product video. Check console.");
    } finally {
    setLoading(false); 
  }
  };

  return (
    
    <div className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
     
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
         <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Product Video Admin Panel</h1>
          <Link
        to="/admin_order"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Order Panel
      </Link>
       <Link
        to="/admin"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Product Panel
      </Link>
      </div>
          <p className="text-gray-400 mb-8">Fill in the details to add a new product video.</p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

            {/* Form */}
            <div className="p-6 border border-gray-700 rounded-xl">
  <h2 className="text-xl font-semibold text-blue-400 mb-6">Product Video Information</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InputField label="Video Title " name="title" required />
    <InputField label="Video URL" name="videolink" type="url" required />
    <InputField label="Product URL" name="productlink" required/>
    <TextAreaField label="Description" name="description" rows={4} required/>
 
  </div>
</div>


            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Product Video
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

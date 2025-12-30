import React, { useRef } from 'react';
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
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);


    const data = Object.fromEntries(formData.entries());

  
    data.price = Number(data.price) || 0;
    data.stock = Number(data.stock) || 0;
    data.numberOfDigits = Number(data.numberOfDigits) || 0;

    //  images string to array
    data.images = data.images ? data.images.split(',').map(url => url.trim()).filter(url => url) : [];

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const result = await response.json();
      console.log(" Product added:", result);
      alert("Product added successfully!");

      // Reset the form
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      alert(" Error adding product. Check console.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
         <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Product Admin Panel</h1>
          <Link
        to="/admin_order"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Order Panel
      </Link>

      <Link
        to="/admin_video"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Video Panel
      </Link>

      </div>
          <p className="text-gray-400 mb-8">Fill in the details to add a new weighing scale product.</p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

            {/* Core Information */}
            <div className="p-6 border border-gray-700 rounded-xl">
  <h2 className="text-xl font-semibold text-blue-400 mb-6">Core Information</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <InputField label="Name" name="name" required />
    <InputField label="Brand" name="brand" required />

    {/*  Category Dropdown */}
    <div className="flex flex-col">
      <label htmlFor="category" className="mb-1 font-medium text-gray-200">
        Category
      </label>
      <select
        id="category"
        name="category"
        required
        className="border border-gray-600 bg-gray-800 text-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Category</option>
        <option value="Commercial Scales">Commercial Scales</option>
        <option value="Industrial">Industrial</option>
        <option value="Jewellery">Jewellery</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Medical">Medical</option>
        <option value="Retail">Retail</option>
        <option value="Test Weights">Test Weights</option>
        <option value="Waterproof">Waterproof</option>
      </select>
    </div>

    <InputField label="Model Number" name="modelNumber" />
    <InputField label="Weighing Capacity" name="weighingCapacity" placeholder="e.g., 30KG" required />
    <InputField label="Material" name="material" />
    <InputField label="Color" name="color" />
    <InputField label="Size" name="size" />
    <TextAreaField label="Usage/Application" name="usageApplication" />
  </div>
</div>

            {/* Technical Specifications */}
            <div className="p-6 border border-gray-700 rounded-xl">
              <h2 className="text-xl font-semibold text-blue-400 mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Accuracy" name="accuracy" />
                <InputField label="Display Type" name="displayType" />
                <InputField label="Display Color" name="displayColor" />
                <InputField label="Number of Digits" name="numberOfDigits" type="number" />
                <InputField label="Calibration" name="calibration" />
                <InputField label="Pan Size" name="panSize" />
                <InputField label="Automation Grade" name="automationGrade" />
                <InputField label="Power Supply" name="powerSupply" />
                <InputField label="Battery Type" name="batteryType" />
                <InputField label="Frequency" name="frequency" />
                <InputField label="Humidity" name="humidity" />
              </div>
            </div>

            {/* Sales & Others */}
            <div className="p-6 border border-gray-700 rounded-xl">
              <h2 className="text-xl font-semibold text-blue-400 mb-6">Sales & Others</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Price" name="price" type="number" required />
                <InputField label="Stock Quantity" name="stock" type="number" />
                <InputField label="Warranty" name="warranty" />
                <InputField label="Deal In" name="dealIn" />
                <div className="md:col-span-2">
                  <TextAreaField label="Image URLs : seperate images using ," name="images" />
                </div>
              </div>
            </div>

            <div className="p-6 border border-gray-700 rounded-xl mt-6">
  <h2 className="text-xl font-semibold text-blue-400 mb-6">About This Item (Leave Features Blank To Load Default)</h2>

   <div className="md:col-span-2">
      <InputField
        label="Additional Description"
        name="extraDescription"
        placeholder="Write detailed information about this product..."
        required
      />
    </div>

  <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-6">

    <InputField label="Feature 1" name="feature1" />
    <InputField label="Feature 2" name="feature2" />
    <InputField label="Feature 3" name="feature3" />
    <InputField label="Feature 4" name="feature4" />
    <InputField label="Feature 5" name="feature5" />

   
  </div>
</div>


            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add Product
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import TopHeader from './TopHeader';
import Navbar from './Navbar';


export default function App() {

  const [orderId, setOrderId] = useState('');
  
  
  const [trackingData, setTrackingData] = useState(null);
  

  const [isLoading, setIsLoading] = useState(false);
  

  const [error, setError] = useState(null);


  const handleTrackOrder = async (e) => {
    
    e.preventDefault();


    setIsLoading(true);
    setTrackingData(null);
    setError(null);

    // --- API Request ---
  
    try {
    
      const response = await fetch(`/api/orders/${orderId}`);

      if (response.ok) {
        const data = await response.json();
        setTrackingData(data);
      } else {
  
        const errorData = await response.json();
        setError(errorData.message || 'Order not found.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to connect to the tracking service. Please try again later.');
    } finally {
    
      setIsLoading(false);
    }
  };

  return (<>

    <TopHeader /> 
      <Navbar />
    
<div className="bg-white min-h-screen/10 font-sans p-4 flex items-center justify-center">
  
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
        
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Track Your Order
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your tracking number below to see the status.
        </p>

        {/*Form */}
        <form onSubmit={handleTrackOrder}>
          <label 
            htmlFor="tracking-number" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tracking Number
          </label>
          <input
            type="text"
            id="tracking-number"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g., 12345XYZ"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 mt-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>

        {/* --- Results*/}
        <div id="tracking-results" className="mt-8">
          {isLoading && (
            <p className="text-center text-gray-600">Tracking order...</p>
          )}
          {error && (
            <div className="text-center text-red-600 font-semibold p-3 bg-red-50 rounded-lg">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}
          {trackingData && (
            <TrackingTimeline order={trackingData} />
          )}
        </div>
        
      </div>
    </div></>
  );
}

function TrackingTimeline({ order }) {

  const history = order.history || [];

  return (
    
    <div className="animate-fadeIn">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Order Status: <span className="text-blue-600">{order.status}</span>
      </h3>
      
      {/* --- Timeline --- */}
      <ol className="relative border-l-2 border-gray-200 ml-2">
        {history.map((step, index) => (
          <li key={index} className="mb-6 ml-6">
            
            {/* --- The status dot --- */}
            <span 
              className={`absolute flex items-center justify-center w-4 h-4 rounded-full -left-2 top-1.5 
                ${step.completed ? 'bg-blue-600' : 'bg-gray-300'}
              `}
            >
              {step.completed && (
                // Checkmark icon for completed steps
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              )}
            </span>
            
            {/* --- The status text --- */}
            <h4 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-600'}`}>
              {step.status}
            </h4>
            <p className="text-sm text-gray-500">
              {step.date}
            </p>
          </li>
        ))}
      </ol>
      
    
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
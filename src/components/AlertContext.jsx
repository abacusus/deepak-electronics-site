import React, { createContext, useContext, useState, useEffect } from "react";

const AlertContext = createContext(null);

export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Override browser alert
    window.alert = (message) => {
      setAlert({ message, type: "info" });
    };
  }, []);

  return (
    <AlertContext.Provider value={{ setAlert }}>
      {children}

      {alert && (
        <div className="fixed top-60 right-50 z-50">
  <div className="
    w-196
    bg-gray-900
    border border-blue-500
    text-white
    p-6
    rounded-xl
    shadow-2xl
    animate-slide-in
  ">
  
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-blue-400">
        Notification
      </h3>
     
    </div>

    {/* Message */}
    <p className="text-gray-200 text-base leading-relaxed">
      {alert.message}
    </p>

    {/* button */}
    <div className="mt-6 flex justify-end">
      <button
        onClick={() => setAlert(null)}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
      >
        OK
      </button>
    </div>
  </div>
</div>

      )}
    </AlertContext.Provider>
  );
}

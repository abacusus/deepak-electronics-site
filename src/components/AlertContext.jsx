import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AlertContext = createContext(null);

export const useAlert = () => useContext(AlertContext);

const ICONS = {
  success: (
    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const closeAlert = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setAlert(null);
      setIsExiting(false);
    }, 400); // Match animation duration
  }, []);

  const showAlert = useCallback((message, type = "info", duration = 5000) => {
    setAlert({ message, type });
    setIsExiting(false);
    if (duration) {
      setTimeout(() => {
        closeAlert();
      }, duration);
    }
  }, [closeAlert]);

  useEffect(() => {
    // Override browser alert
    window.alert = (message) => {
      showAlert(message, "info");
    };
  }, [showAlert]);

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}

      {alert && (
        <div className={`fixed top-6 right-6 z-[9999] w-full max-w-sm ml-auto mr-auto sm:mr-0 ${isExiting ? 'animate-slideOutRight' : 'animate-slideInRight'}`}>
          <div className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/10 relative">
            {/* Progress bar */}
            <div
              className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${alert.type === 'success' ? 'from-green-500 to-emerald-400' :
                  alert.type === 'error' ? 'from-red-600 to-pink-500' :
                    alert.type === 'warning' ? 'from-amber-500 to-orange-400' :
                      'from-blue-500 to-indigo-400'
                }`}
              style={{
                animation: 'progressBar 5s linear forwards',
                width: '100%'
              }}
            />

            <div className="p-5 flex items-start gap-4">
              <div className="flex-shrink-0 mt-0.5">
                {ICONS[alert.type] || ICONS.info}
              </div>

              <div className="flex-grow">
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${alert.type === 'success' ? 'text-green-400' :
                    alert.type === 'error' ? 'text-red-400' :
                      alert.type === 'warning' ? 'text-yellow-400' :
                        'text-blue-400'
                  }`}>
                  {alert.type}
                </h3>
                <p className="text-gray-100 text-sm leading-relaxed font-medium">
                  {alert.message}
                </p>
              </div>

              <button
                onClick={closeAlert}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

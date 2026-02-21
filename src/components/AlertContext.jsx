import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  X
} from "lucide-react";

const AlertContext = createContext(null);

export const useAlert = () => useContext(AlertContext);

const ICONS = {
  success: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
  error: <XCircle className="w-6 h-6 text-rose-400" />,
  warning: <AlertTriangle className="w-6 h-6 text-amber-400" />,
  info: <Info className="w-6 h-6 text-indigo-400" />,
};

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const closeAlert = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setAlert(null);
      setIsExiting(false);
    }, 400);
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
    window.alert = (message) => {
      showAlert(message, "info");
    };
    // Global injection for programmatic triggers
    window.showCustomAlert = (message, type = "info", duration = 5000) => {
      showAlert(message, type, duration);
    };
  }, [showAlert]);

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}

      {alert && (
        <div className={`fixed top-6 right-6 z-[9999] w-full max-w-sm ml-auto mr-auto sm:mr-0 px-4 sm:px-0 ${isExiting ? 'animate-slideOutRight' : 'animate-slideInRight'}`}>
          <div className={`
            relative overflow-hidden rounded-[2rem] border backdrop-blur-2xl shadow-2xl transition-all duration-300
            ${alert.type === 'success' ? 'bg-emerald-950/40 border-emerald-500/20 shadow-emerald-500/10' :
              alert.type === 'error' ? 'bg-rose-950/40 border-rose-500/20 shadow-rose-500/10' :
                alert.type === 'warning' ? 'bg-amber-950/40 border-amber-500/20 shadow-amber-500/10' :
                  'bg-slate-900/60 border-white/10 shadow-indigo-500/10'}
          `}>
            {/* Progress bar */}
            <div
              className={`absolute bottom-0 left-0 h-1.5 bg-gradient-to-r opacity-50 ${alert.type === 'success' ? 'from-emerald-500 to-teal-400' :
                alert.type === 'error' ? 'from-rose-500 to-pink-500' :
                  alert.type === 'warning' ? 'from-amber-500 to-yellow-400' :
                    'from-indigo-500 to-purple-400'
                }`}
              style={{
                animation: 'progressBar 5s linear forwards',
                width: '100%'
              }}
            />

            <div className="p-6 flex items-start gap-5">
              <div className={`
                flex-shrink-0 p-2 rounded-2xl
                ${alert.type === 'success' ? 'bg-emerald-500/10' :
                  alert.type === 'error' ? 'bg-rose-500/10' :
                    alert.type === 'warning' ? 'bg-amber-500/10' :
                      'bg-indigo-500/10'}
              `}>
                {ICONS[alert.type] || ICONS.info}
              </div>

              <div className="flex-grow pt-1">
                <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 ${alert.type === 'success' ? 'text-emerald-400' :
                  alert.type === 'error' ? 'text-rose-400' :
                    alert.type === 'warning' ? 'text-amber-400' :
                      'text-indigo-400'
                  }`}>
                  {alert.type}
                </h3>
                <p className="text-white text-sm leading-relaxed font-bold tracking-tight">
                  {alert.message}
                </p>
              </div>

              <button
                onClick={closeAlert}
                className="flex-shrink-0 mt-1 p-1 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

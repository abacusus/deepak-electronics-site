import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  AlertCircle,
  Loader2,
  ArrowRight,
  ClipboardList,
  Calendar,
  User,
  Hash
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';

const StatusIcon = ({ status, completed }) => {
  const icons = {
    'Ordered': <ClipboardList className="w-5 h-5" />,
    'Pending': <Clock className="w-5 h-5" />,
    'Shipped': <Truck className="w-5 h-5" />,
    'Delivered': <CheckCircle2 className="w-5 h-5" />,
    'Cancelled': <AlertCircle className="w-5 h-5" />
  };

  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: completed ? '#4f46e5' : '#1e293b',
        borderColor: completed ? '#6366f1' : '#334155',
        color: completed ? '#ffffff' : '#64748b',
        scale: completed ? 1.1 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative z-10 p-2.5 rounded-xl border shadow-lg"
    >
      {icons[status] || <Package className="w-5 h-5" />}
    </motion.div>
  );
};

function TrackingTimeline({ order }) {
  const standardSteps = ["Ordered", "Pending", "Shipped", "Delivered"];
  const currentStatusIndex = standardSteps.indexOf(order.status);

  const steps = order.history && order.history.length > 0
    ? order.history
    : standardSteps.map((status, index) => ({
      status,
      completed: index <= currentStatusIndex,
      date: index === 0 ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }) :
        index === currentStatusIndex ? "Latest Update" : ""
    }));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mt-12"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Order Identified</p>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black text-white tracking-tight"
            >
              #{order.orderId}
            </motion.h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Live Status</span>
            <motion.div
              layoutId="status-badge"
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                order.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                  'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}
            >
              {order.status}
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline View */}
          <div className="space-y-8 relative">
            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-800"></div>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-6 relative"
              >
                <StatusIcon status={step.status} completed={step.completed} />
                <div className="pt-1.5">
                  <h4 className={`text-lg font-black tracking-tight ${step.completed ? 'text-white' : 'text-slate-600'}`}>
                    {step.status}
                  </h4>
                  {step.date && (
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-bold uppercase tracking-wider mt-1">
                      <Calendar className="w-3 h-3" />
                      {step.date}
                    </div>
                  )}
                </div>
                {step.completed && index < steps.length - 1 && steps[index + 1].completed && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 40 }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                    className="absolute left-[23.5px] top-10 w-0.5 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                  ></motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Details Card */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 space-y-6 hover:bg-slate-900/70 transition-colors duration-300">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                    <Package className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Product</p>
                    <p className="text-sm font-bold text-white">{order.productName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Quantity: {order.quantity}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-purple-500/10 rounded-xl">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shipping To</p>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {order.address.town}, {order.address.district}
                    </p>
                    <p className="text-xs text-slate-400">{order.address.state}, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Estimated Delivery</p>
                  <p className="text-sm font-black text-indigo-400">3-5 Business Days</p>
                </div>
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-600/20"
                >
                  <Truck className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </div>

            <p className="text-center text-[11px] font-medium text-slate-500 leading-relaxed px-4">
              Need help with your order? Contact our support team with your Order ID for immediate assistance.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTrackingData(null);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setTrackingData(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Order not found in our logs.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Connection interrupted. Please verify your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen font-sans selection:bg-indigo-500/30 text-white flex flex-col">
      <TopHeader />
      <Navbar />

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden mt-20">
        <motion.div
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] -right-[10%] w-[35%] h-[35%] bg-purple-600/5 rounded-full blur-[120px]"
        ></motion.div>
      </div>

      <main className="flex-grow relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 w-full">
        {/* Search Phase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-6 cursor-default"
          >
            <Truck className="w-3 h-3" /> Digital Logistics Hub
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
            Track <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Shipment</span>
          </h1>
          <p className="text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
            Enter your 8-digit tracking identifier to see the movement of your precision equipment.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.form
            layout
            onSubmit={handleTrackOrder}
            className="group bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-[2.5rem] shadow-2xl focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-500"
          >
            <div className="flex gap-2">
              <div className="flex-grow relative">
                <Hash className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Paste Track ID..."
                  required
                  className="w-full bg-transparent py-5 pl-16 pr-4 text-xl font-bold text-white focus:outline-none placeholder:text-slate-600"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 text-white px-8 md:px-10 rounded-[2rem] font-black text-lg hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-3 overflow-hidden shadow-lg shadow-indigo-600/20"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>Track <ArrowRight className="w-5 h-5" /></>
                )}
              </motion.button>
            </div>
          </motion.form>

          {/* Results Area */}
          <div className="mt-12 w-full">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 space-y-4"
                >
                  <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                  <p className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">Interrogating Logistics Database...</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-3xl flex items-center gap-4"
                >
                  <div className="p-3 bg-rose-500/20 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg tracking-tight">Access Denied</h4>
                    <p className="text-slate-400 font-medium text-sm">{error}</p>
                  </div>
                </motion.div>
              )}

              {trackingData && (
                <TrackingTimeline key="results" order={trackingData} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

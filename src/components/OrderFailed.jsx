import { useNavigate, useLocation } from "react-router-dom";
import { AlertCircle, RefreshCcw, Phone, Home, Mail } from "lucide-react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import RandomBackground from "./RandomBackground";

export default function OrderFailed() {
    const navigate = useNavigate();
    const location = useLocation();
    const { error, productId } = location.state || {};

    return (
        <div className="relative w-full min-h-screen bg-slate-50 overflow-x-hidden">
            <RandomBackground />
            <TopHeader />
            <Navbar />

            <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-rose-100/50 border border-slate-100 overflow-hidden animate-fadeIn">
                    {/* Header Section */}
                    <div className="bg-rose-600 p-12 text-center text-white relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <AlertCircle className="w-48 h-48" />
                        </div>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6">
                            <AlertCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-4">Payment Failed</h1>
                        <p className="text-rose-100 text-lg font-medium">Something went wrong with your transaction.</p>
                    </div>

                    <div className="p-8 md:p-12 space-y-12">
                        <div className="bg-rose-50 border border-rose-100 p-8 rounded-3xl">
                            <h2 className="text-xl font-black text-rose-900 mb-4">What happened?</h2>
                            <p className="text-rose-700 font-medium leading-relaxed">
                                {error || "We couldn't process your payment. This could be due to a connection issue, insufficient funds, or the transaction being cancelled."}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                                <h3 className="font-black text-slate-900 text-lg flex items-center gap-3">
                                    <RefreshCcw className="w-5 h-5 text-indigo-600" />
                                    Try Again
                                </h3>
                                <p className="text-slate-500 font-medium pb-2">You can try placing the order again. Your cart details are preserved.</p>
                                <button
                                    onClick={() => productId ? navigate(`/products/${productId}`) : navigate("/products")}
                                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                                >
                                    Return to Product
                                </button>
                            </div>

                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                                <h3 className="font-black text-slate-900 text-lg flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-indigo-600" />
                                    Need Help?
                                </h3>
                                <p className="text-slate-500 font-medium pb-2">If your amount was deducted, please contact our support team.</p>
                                <div className="space-y-3">
                                    <a href="tel:+910000000000" className="flex items-center gap-3 text-slate-700 font-bold hover:text-indigo-600 transition-colors">
                                        <Phone className="w-4 h-4" /> +91 97170 99170
                                    </a>
                                    <a href="mailto:support@deepakelectronics.com" className="flex items-center gap-3 text-slate-700 font-bold hover:text-indigo-600 transition-colors">
                                        <Mail className="w-4 h-4" /> deepakelectronics320@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-8 border-t border-slate-100 flex justify-center">
                            <button
                                onClick={() => navigate("/")}
                                className="inline-flex items-center gap-2 py-4 px-8 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all font-medium"
                            >
                                <Home className="w-5 h-5" />
                                Return to Home
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

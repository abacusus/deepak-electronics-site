import { useNavigate, useLocation } from "react-router-dom";
import {
    CheckCircle2,
    Package,
    MapPin,
    ArrowRight,
    Home,
    ShoppingBag,
    FileText,
    Printer,
    Phone,
    Mail,
    Globe
} from "lucide-react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import RandomBackground from "./RandomBackground";


// ---------------- QUOTATION TEMPLATE ----------------

const QuotationTemplate = ({ orderId, product, quantity, address, paymentMethod }) => {
    if (!orderId || !product || !address) return null;

    const date = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const unitPrice = product.price;
    const subtotal = unitPrice * quantity;
    const gstRate = 18;
    const gstAmount = Math.round(subtotal * (gstRate / 100));
    const total = subtotal //subtotal + gstAmount;
    const sgst = (gstAmount / 2).toFixed(2);
    const cgst = (gstAmount / 2).toFixed(2);

    const numberToWords = (num) => {
        const wholeNum = Math.floor(num);
        const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const n = ('000000000' + wholeNum).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return '';
        let str = '';
        str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
        str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
        str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
        str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' Hundred ' : '';
        str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
        return str + ' Rupees only';
    };

    return (
        <div id="quotation-template" className="quotation-print-only" style={{
            backgroundColor: 'white',
            padding: '40px',
            color: '#1e293b',
            fontFamily: 'sans-serif',
            fontSize: '12px',
            lineHeight: '1.25',
            width: '750px',
            margin: '0 auto'
        }}>
            {/* Professional Header Section */}
            <div className="flex justify-between items-start mb-6 pb-4" style={{ borderBottom: '2px solid #4f46e5' }}>
                <div className="flex-1">
                    <h1 className="text-xl font-black mb-1" style={{ color: '#0f172a' }}>DEEPAK ELECTRONICS</h1>
                    <div className="text-[10px] space-y-0.5 font-semibold uppercase" style={{ color: '#475569' }}>
                        <p>IN FRONT OF BASANT VALLEY SCHOOL, SADHRANA ROAD,</p>
                        <p>NEAR GARHI HARSARU RAILWAY STATION, GARHI HARSARU,</p>
                        <p>GURGAON, HARYANA</p>
                        <p>GOVT APPROVED DEALER AND REPAIR OF ELECTRONICS WEIGHTING MACHINES</p>
                        <p>DEALER LICENSE NO. OD/70/HAR, REPAIR LICENSE NO OR/86/HAR</p>
                        <p>AUTH. DEALER - ESSAE, EAGLE YES WEIGH</p>
                        <p>Phone no. : 9718298952</p>
                        <p>Email : deepakelectronics320@gmail.com</p>
                        <p>GSTIN : 06BBNPB1954K1ZK</p>
                        <p>State: 06-Haryana</p>
                        <p>Pin code: 122505</p>
                    </div>
                </div>
                <div className="w-36 text-center">
                    <div className="flex items-center justify-center w-32 h-32 mb-1 mx-auto">
                        <img
                            src="https://res.cloudinary.com/dcajb02df/image/upload/v1755178945/logod-removebg-preview_saiuhy.png"
                            alt="Deepak Electronics"
                            className="max-w-full max-h-full object-contain"
                            crossOrigin="anonymous"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                    <h3 className="text-[10px] font-black underline mb-2 uppercase" style={{ color: '#0f172a' }}>Receipt For</h3>
                    <div className="space-y-1 font-bold" style={{ color: '#1e293b' }}>
                        <p className="text-[13px]">{address.name.toUpperCase()}</p>
                        <p style={{ color: '#475569' }}>{address.houseNo}, {address.streetNo}</p>
                        <p style={{ color: '#475569' }}>{address.town}, {address.district}</p>
                        <p style={{ color: '#475569' }}>{address.state} - {address.pincode}</p>
                        <p style={{ color: '#0f172a' }}>Contact No. : {address.mobile}</p>
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-[10px] font-black underline mb-2 uppercase" style={{ color: '#0f172a' }}>Receipt Details</h3>
                    <div className="space-y-1 font-bold" style={{ color: '#1e293b' }}>
                        <p style={{ color: '#0f172a' }}>Receipt No. : DE/25-26/{orderId}</p>
                        <p style={{ color: '#0f172a' }}>Order ID : {orderId}</p>
                        <p style={{ color: '#0f172a' }}>Date : {date}</p>
                        <p style={{ color: '#0f172a' }}>Payment Method : {paymentMethod || "N/A"}</p>
                        <p style={{ color: '#0f172a' }}>Place of supply: 06-Haryana</p>
                    </div>
                </div>
            </div>

            <table className="w-full border-collapse mb-6" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr className="text-[10px] font-black uppercase" style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}>
                        <th className="px-2 py-1.5 text-left" style={{ border: '1px solid #4338ca' }}>Item Name</th>
                        <th className="px-2 py-1.5 text-center" style={{ border: '1px solid #4338ca' }}>Qty</th>
                        <th className="px-2 py-1.5 text-right w-24" style={{ border: '1px solid #4338ca' }}>Amount</th>
                    </tr>
                </thead>
                <tbody className="text-[11px] font-bold">
                    <tr>
                        <td className="px-2 py-3" style={{ border: '1px solid #cbd5e1' }}>
                            <p className="font-black" style={{ color: '#0f172a' }}>{product.name.toUpperCase()}</p>
                        </td>
                        <td className="px-2 py-3 text-center" style={{ border: '1px solid #cbd5e1', color: '#1e293b' }}>{quantity}</td>
                        <td className="px-2 py-3 text-right font-black" style={{ border: '1px solid #cbd5e1', color: '#0f172a' }}>₹ {total.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h4 className="text-[10px] font-black underline mb-1 uppercase" style={{ color: '#0f172a' }}>Amount In Words</h4>
                    <p className="font-bold italic" style={{ color: '#334155' }}>{numberToWords(total)}</p>

                    <div className="mt-4">
                        <h4 className="text-[10px] font-black underline mb-1 uppercase" style={{ color: '#0f172a' }}>Terms and Conditions</h4>
                        <div className="text-[9px] font-bold space-y-0.5" style={{ color: '#475569' }}>
                            <p className="font-extrabold uppercase mb-1" style={{ color: '#4f46e5' }}>Price inclusive of all tax</p>
                            <p>• Payment Terms: 100% advance.</p>
                            <p>• Delivery: 3-6 days after confirm.</p>
                            <p>• Warranty: Standard manufacturer warranty.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="space-y-1 font-bold text-right ml-auto w-48">
                        <div className="flex justify-between px-2 py-1 rounded mt-2" style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}>
                            <span className="font-black uppercase text-[10px]">Total Amount</span>
                            <span className="font-black">₹ {total.toFixed(2)}</span>
                        </div>
                        <p className="text-[8px] font-bold mt-1" style={{ color: '#94a3b8' }}>(Incl. of all tax)</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 items-end mt-8 border-t pt-6" style={{ borderTopColor: '#cbd5e1' }}>
                <div className="text-center col-span-2 mt-8 pt-4 border-t italic font-medium" style={{ borderTopColor: '#f1f5f9', color: '#94a3b8' }}>
                    <p className="text-[10px]">This is a computer generated document and does not require a physical signature.</p>
                </div>
            </div>
        </div>
    );
};

// ---------------- ORDER SUCCESS PAGE ----------------

export default function OrderSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId, product, quantity, address, paymentMethod } = location.state || {};

    const handleDownloadPDF = () => {
        if (!window.html2pdf) {
            alert('PDF library is still loading. Please try again in a moment.');
            return;
        }

        const element = document.getElementById('quotation-template');
        if (!element) return;

        const downloadBtn = document.activeElement;
        if (downloadBtn) {
            downloadBtn.disabled = true;
            downloadBtn.innerText = 'Generating PDF...';
        }

        const opt = {
            margin: [0.1, 0.1],
            filename: `Receipt_${orderId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                allowTaint: false,
                scrollY: 0,
                scrollX: 0
            },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        window.html2pdf().set(opt).from(element).save().then(() => {
            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-6 h-6"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> Download PDF Receipt';
            }
        }).catch(err => {
            console.error('PDF Error:', err);
            alert('Failed to generate PDF. Please try again.');
            if (downloadBtn) {
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text w-6 h-6"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> Download PDF Receipt';
            }
        });
    };


    if (!orderId) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
                <TopHeader />
                <Navbar />
                <div className="text-center bg-white p-12 rounded-[3rem] shadow-xl max-w-md w-full mt-20">
                    <Package className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                    <h2 className="text-2xl font-black text-slate-800 mb-4">No Order Found</h2>
                    <p className="text-slate-500 mb-8">We couldn't retrieve your order details. Did you refresh the page?</p>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen bg-slate-50 overflow-x-hidden pb-20">
            <RandomBackground />
            <TopHeader />
            <Navbar />

            <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 md:pt-20">
                <div className="bg-white rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden animate-fadeIn">
                    {/* Header Section */}
                    <div className="bg-indigo-600 p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <CheckCircle2 className="w-64 h-64" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black mb-4">Order Confirmed!</h1>
                            <p className="text-indigo-100 text-lg font-medium">Your order has been placed successfully.</p>

                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                    <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest block mb-1 text-center">Order ID</span>
                                    <span className="text-2xl font-black tracking-wider block">#{orderId}</span>
                                </div>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="no-print inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-[2rem] font-black hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 min-w-[220px] text-lg"
                                >
                                    <FileText className="w-6 h-6" /> Download  Receipt
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 space-y-12">
                        {/* Visible Quotation Section */}
                        <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center justify-between mb-6 px-4">
                                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                                    <FileText className="w-7 h-7 text-indigo-600" /> Order Receipt
                                </h2>
                            </div>

                            <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden overflow-x-auto">
                                <div className="min-w-[700px] md:min-w-0">
                                    <QuotationTemplate
                                        orderId={orderId}
                                        product={product}
                                        quantity={quantity}
                                        address={address}
                                        paymentMethod={paymentMethod}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Summary Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Product Section */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                    <Package className="w-6 h-6 text-indigo-600" /> Product Details
                                </h2>
                                <div className="flex gap-6 p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <div className="w-24 h-24 bg-white rounded-2xl p-3 flex items-center justify-center shadow-sm">
                                        <img src={product?.images?.[0]} alt="" className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800 leading-tight mb-2 line-clamp-2">{product?.name}</h3>
                                        <p className="text-slate-500 text-sm font-medium">Quantity: {quantity}</p>
                                        <p className="text-indigo-600 font-black mt-1">₹{(product?.price * quantity).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Section */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-indigo-600" /> Shipping Address
                                </h2>
                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 font-medium text-slate-600">
                                    <p className="text-slate-900 font-bold text-lg mb-2">{address?.name}</p>
                                    <p>{address?.houseNo}, {address?.streetNo}</p>
                                    <p>{address?.town}, {address?.district}</p>
                                    <p>{address?.state} - {address?.pincode}</p>
                                    <p className="mt-3 pt-3 border-t text-sm font-bold text-slate-400">Mobile: {address?.mobile}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Status Section */}
                        <div className="no-print bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 text-center">
                            <p className="text-indigo-800 font-bold text-lg mb-4">Want to track your delivery status?</p>
                            <button
                                onClick={() => navigate("/trackorder")}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black hover:gap-4 transition-all shadow-lg"
                            >
                                Track Your Order <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation Actions */}
                        <div className="no-print grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-50">
                            <button
                                onClick={() => navigate("/products")}
                                className="flex items-center justify-center gap-2 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all font-medium"
                            >
                                <ShoppingBag className="w-5 h-5" /> Continue Shopping
                            </button>
                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center justify-center gap-2 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all font-medium"
                            >
                                <Home className="w-5 h-5" /> Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </main>


            <style dangerouslySetInnerHTML={{
                __html: `
                .quotation-print-only { 
                    display: block; 
                    background: white;
                }

                @media print {
                    body * { visibility: hidden; }
                    .quotation-print-only, .quotation-print-only * { visibility: visible; }
                    .quotation-print-only {
                        display: block !important;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print { display: none !important; }
                    @page { size: A4; margin: 10mm; }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `}} />
        </div >
    );
}

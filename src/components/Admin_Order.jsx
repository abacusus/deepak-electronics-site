import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "./AlertContext";
import {
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowLeft,
  Layout,
  Video,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  ClipboardList,
  Search
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Shipped: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Cancelled: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  const icons = {
    Pending: <Clock className="w-3.5 h-3.5" />,
    Shipped: <Truck className="w-3.5 h-3.5" />,
    Delivered: <CheckCircle2 className="w-3.5 h-3.5" />,
    Cancelled: <XCircle className="w-3.5 h-3.5" />,
  };

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status] || styles.Pending}`}>
      {icons[status] || icons.Pending}
      {status}
    </span>
  );
};

export default function Admin_Order() {
  const { showAlert } = useAlert();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/getorders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/getorders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showAlert(`Order status updated to ${newStatus}`, "success");
        fetchOrders();
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      showAlert("Error updating status. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order =>
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.address.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0f172a] min-h-screen p-4 md:p-12 font-sans selection:bg-indigo-500/30 text-slate-200">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[35%] h-[35%] bg-purple-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-4">
              <div className="p-3 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-500/20">
                <ClipboardList className="w-8 h-8 text-white" />
              </div>
              Order Management
            </h1>
            <p className="text-slate-400 font-medium ml-1">Track and manage customer orders in real-time</p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/admin"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-slate-700/50 text-white rounded-[2rem] transition-all duration-300 hover:bg-white/10 hover:border-slate-500"
            >
              <Layout className="w-5 h-5 text-indigo-400" />
              <span className="font-bold">Inventory</span>
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link
              to="/admin_video"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-slate-700/50 text-white rounded-[2rem] transition-all duration-300 hover:bg-white/10 hover:border-slate-500"
            >
              <Video className="w-5 h-5 text-purple-400" />
              <span className="font-bold">Videos</span>
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

        {/* Search and Stats Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <div className="lg:col-span-3 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer, or Product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-slate-700/50 rounded-[2rem] py-5 pl-16 pr-8 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all font-medium placeholder:text-slate-500"
            />
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-5 flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Orders</p>
              <p className="text-2xl font-black text-white">{orders.length}</p>
            </div>
            <div className="w-px h-8 bg-slate-700/50"></div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Pending</p>
              <p className="text-2xl font-black text-amber-500">{orders.filter(o => o.status === 'Pending').length}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
            <p className="font-bold text-slate-500 uppercase tracking-[0.2em] text-xs">Synchronizing Database...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl hover:bg-white/[0.07] transition-all duration-500 overflow-hidden"
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 left-0 w-2 h-full ${order.status === 'Delivered' ? 'bg-emerald-500' :
                  order.status === 'Cancelled' ? 'bg-rose-500' :
                    order.status === 'Shipped' ? 'bg-blue-500' : 'bg-amber-500'
                  }`}></div>

                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Left: Order Meta */}
                  <div className="lg:w-80 flex-shrink-0 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-tight">#{order.orderId}</h3>
                      <div className="mt-4">
                        <StatusBadge status={order.status} />
                      </div>
                    </div>

                    <div className="p-5 bg-slate-900/50 rounded-3xl border border-white/5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Change Status</span>
                      </div>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 text-slate-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold cursor-pointer"
                      >
                        {["Pending", "Shipped", "Delivered", "Cancelled"].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Middle: Product Details */}
                  <div className="flex-grow space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-500/10 rounded-2xl">
                        <Package className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Items Ordered</p>
                        <h4 className="text-xl font-bold text-white leading-tight">{order.productName}</h4>
                        <p className="text-indigo-400 font-black mt-1">Quantity: {order.quantity}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                      {/* Customer Info */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-800 rounded-xl">
                            <User className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Customer</p>
                            <p className="text-sm font-bold text-slate-200">{order.address.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-800 rounded-xl">
                            <Phone className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Phone</p>
                            <p className="text-sm font-bold text-slate-200">{order.address.mobile}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-800 rounded-xl">
                            <Mail className="w-4 h-4 text-slate-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">Email</p>
                            <p className="text-sm font-bold text-slate-200">{order.address.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-slate-800 rounded-xl flex-shrink-0">
                          <MapPin className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-500 uppercase">Shipping Address</p>
                          <p className="text-sm text-slate-300 leading-relaxed font-medium">
                            {order.address.houseNo}, {order.address.streetNo && `${order.address.streetNo}, `}
                            {order.address.landmark && `${order.address.landmark}, `}
                            {order.address.town}, {order.address.district}, {order.address.state} - <span className="text-white font-black">{order.address.pincode}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white/5 border border-white/10 rounded-[3rem] text-center">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <ClipboardList className="w-12 h-12 text-slate-600" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">No matching orders</h2>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">We couldn't find any orders matching your search. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

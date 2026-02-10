import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAlert } from "./AlertContext";
import {
  Video,
  Settings,
  Layout,
  Plus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  ClipboardList,
  Youtube,
  Info as InfoIcon,
  Link as LinkIcon,
  Trash2
} from "lucide-react";

const InputField = ({ label, icon: Icon, name, type = 'text', placeholder, required = false, onChange }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />}
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        placeholder={placeholder || `e.g., ${label}`}
        required={required}
        className={`w-full bg-white/5 border border-slate-700/50 rounded-2xl py-3 ${Icon ? 'pl-12' : 'px-4'} pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 font-medium`}
      />
    </div>
  </div>
);

const TextAreaField = ({ label, name, placeholder, rows = 3 }) => (
  <div className="space-y-1.5">
    <label htmlFor={name} className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-slate-700/50 rounded-2xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 font-medium"
    />
  </div>
);


export default function Admin_Vid() {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
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

      showAlert("Product video published successfully!", "success");
      formRef.current.reset();
      setVideoUrl("");
    } catch (err) {
      console.error(err);
      showAlert("Error publishing video. Check console.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen p-4 md:p-12 font-sans selection:bg-indigo-500/30">
      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] -right-[10%] w-[35%] h-[35%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 flex items-center gap-4">
              <div className="p-3 bg-purple-600 rounded-3xl shadow-lg shadow-purple-500/20">
                <Video className="w-8 h-8 text-white" />
              </div>
              Studio Control
            </h1>
            <p className="text-slate-400 font-medium ml-1">Curate your product exhibition gallery</p>
          </div>

          <div className="flex gap-4">
            <Link
              to="/admin_order"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-slate-700/50 text-white rounded-[2rem] transition-all duration-300 hover:bg-white/10 hover:border-slate-500"
            >
              <ClipboardList className="w-5 h-5 text-indigo-400" />
              <span className="font-bold">Orders</span>
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
            <Link
              to="/admin"
              className="group flex items-center gap-3 px-6 py-4 bg-white/5 border border-slate-700/50 text-white rounded-[2rem] transition-all duration-300 hover:bg-white/10 hover:border-slate-500"
            >
              <Layout className="w-5 h-5 text-emerald-400" />
              <span className="font-bold">Inventory</span>
              <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Inputs */}
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-purple-600"></div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-purple-500/10 rounded-xl">
                    <InfoIcon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Video Details</h2>
                </div>

                <div className="space-y-8">
                  <InputField
                    label="Descriptive Title"
                    name="title"
                    required
                    placeholder="e.g. Table Top Weight Demonstration"
                  />

                  <InputField
                    label="Youtube Embedded URL"
                    name="videolink"
                    type="url"
                    required
                    icon={Youtube}
                    placeholder="https://www.youtube.com/embed/..."
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />

                  <InputField
                    label="Redirect Product Link"
                    name="productlink"
                    required
                    icon={LinkIcon}
                    placeholder="https://yourapp.pages.dev/products/..."
                  />

                  <TextAreaField
                    label="Exhibition Description"
                    name="description"
                    rows={4}
                    required
                    placeholder="What should the viewer expect from this video?"
                  />
                </div>
              </div>
            </div>

            {/* Right: Preview & Submit */}
            <div className="space-y-10">
              <div className="sticky top-10 space-y-10">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 bg-indigo-500/10 rounded-xl">
                      <Layout className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h2 className="text-xl font-black text-white">Exhibition Preview</h2>
                  </div>

                  <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 flex items-center justify-center relative">
                    {videoUrl ? (
                      <iframe
                        src={videoUrl}
                        title="Preview"
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-slate-600 p-8 text-center">
                        <Youtube className="w-12 h-12 opacity-20" />
                        <p className="text-[13px] font-bold">Paste a valid embed URL to see preview</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                    <p className="text-[11px] font-bold text-indigo-300 leading-relaxed uppercase tracking-wider">
                      💡 Tip: Use YouTube's "Embed" link for best compatibility (e.g., https://youtube.com/embed/...)
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden py-6 rounded-[2rem] bg-purple-600 text-white font-black text-xl shadow-2xl shadow-purple-500/20 hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {loading ? (
                      <><Loader2 className="w-6 h-6 animate-spin" /> Publishing...</>
                    ) : (
                      <><Plus className="w-6 h-6" /> Add Exhibition</>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
}

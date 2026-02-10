import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Play,
  ExternalLink,
  Video,
  Loader2,
  AlertCircle,
  PlayCircle,
  Package
} from "lucide-react";

const VideoSkeleton = () => (
  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden animate-pulse">
    <div className="aspect-video bg-slate-800/50"></div>
    <div className="p-8 space-y-4">
      <div className="h-6 bg-slate-800/50 rounded-lg w-3/4"></div>
      <div className="h-4 bg-slate-800/50 rounded-lg w-full"></div>
      <div className="h-12 bg-slate-800/50 rounded-2xl w-32"></div>
    </div>
  </div>
);

export default function ProductVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/productvid");
        if (!res.ok) throw new Error("Failed to fetch videos");

        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load product videos. Our server might be busy.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="bg-[#0f172a] min-h-screen font-sans selection:bg-indigo-500/30 text-slate-200">
      <TopHeader />
      <Navbar />

      {/* Dynamic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] -right-[10%] w-[35%] h-[35%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <PlayCircle className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-400">Experience Precision</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Exhibition</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
            Discover the accuracy and build quality of our weighing solutions through detailed video demonstrations.
          </p>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-24 bg-rose-500/5 border border-rose-500/10 rounded-[3rem] text-center animate-springUp">
            <AlertCircle className="w-16 h-16 text-rose-500 mb-6" />
            <h2 className="text-2xl font-black text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-slate-400 max-w-sm mx-auto font-medium">{error}</p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map(i => <VideoSkeleton key={i} />)}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {videos.map((video, idx) => (
              <div
                key={video.id}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl hover:bg-white/[0.08] transition-all duration-500 animate-fadeIn"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Video Container */}
                <div className="aspect-video relative overflow-hidden">
                  <iframe
                    src={video.videolink}
                    title={video.title}
                    className="absolute inset-0 w-full h-full grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                    allowFullScreen
                  ></iframe>
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Info Container */}
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors">
                    {video.title}
                  </h2>

                  <p className="text-slate-400 font-medium leading-relaxed mb-8 line-clamp-2 uppercase text-[12px] tracking-wide">
                    {video.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={video.productlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-[2rem] font-black hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 transform group-hover:scale-[1.02]"
                    >
                      <Package className="w-5 h-5" />
                      View Product
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white/5 border border-white/10 rounded-[3rem] text-center animate-springUp">
            <Video className="w-20 h-20 text-slate-700 mb-6" />
            <h2 className="text-2xl font-black text-white mb-2">Theater is Empty</h2>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">No product videos have been added yet. Stay tuned for future exhibitions.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

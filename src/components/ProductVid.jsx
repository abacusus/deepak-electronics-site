import React, { useEffect, useState } from "react";
import TopHeader from "./TopHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
        setError("Unable to load product videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
       <TopHeader />
      <Navbar />
      <div className="max-w-6xl mx-auto mb-20">
        <h1 className="text-3xl font-bold text-white mb-8">
          Product Videos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Video */}
              <div className="aspect-video">
                <iframe
                  src={video.videolink}
                  title={video.title}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>

              {/* info */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {video.title}
                </h2>

                <p className="text-gray-400 mb-4">
                  {video.description}
                </p>

                <a
                  href={video.productlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            No product videos available.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}

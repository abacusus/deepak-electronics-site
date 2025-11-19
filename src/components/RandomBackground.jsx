import { useEffect, useState } from "react";

export default function FireflyBackground() {
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const total = 55;
    const list = [];

    for (let i = 0; i < total; i++) {
      list.push({
        id: i,
        size: Math.random() * 6 + 4,     
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.6 + 0.4,
        delay: Math.random() * 4,
        duration: Math.random() * 6 + 4,  
        driftX: Math.random() * 40 - 20,   
        driftY: Math.random() * 40 - 20,
      });
    }

    setFireflies(list);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-white">
      {fireflies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-purple-600 blur-sm animate-firefly-move"
          style={{
  width: `${f.size}px`,
  height: `${f.size}px`,
  left: `${f.x}%`,
  top: `${f.y}%`,
  opacity: f.opacity,
  animationDelay: `${f.delay}s`,
  animationDuration: `${f.duration}s`,
  "--dx": `${f.driftX}px`,
  "--dy": `${f.driftY}px`,
  transform: "translate(-50%, -50%)",
  boxShadow: "0 0 15px 8px rgba(255, 255, 150, 0.9)", 
}}

        ></div>
      ))}

      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl text-purple-200 font-bold drop-shadow-lg">
          
        </h1>
      </div>
    </div>
  );
}

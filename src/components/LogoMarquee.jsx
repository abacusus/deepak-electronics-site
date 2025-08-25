import "./Marquee.css";

const clientLogos = [
  { name: "Tata", src: "https://www.svgrepo.com/show/330695/infosys.svg" },
  { name: "Aditya Birla", src: "https://www.svgrepo.com/show/303108/google-icon-logo.svg" },
  { name: "Nestlé", src: "https://cdn.worldvectorlogo.com/logos/nestle-4.svg" },
  { name: "Bosch", src: "https://www.svgrepo.com/show/330084/bosch.svg" },
  { name: "Reliance", src: "https://www.svgrepo.com/show/303405/honda-4-logo.svg" },
  { name: "Siemens", src: "https://www.svgrepo.com/show/303547/siemens-logo.svg" },
];

const LogoMarquee = () => {
  return (
    <div >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Esteemed Clients</h2>
        <p className="text-gray-600">Proudly serving industry leaders</p>
      </div>
    <div className="logo-carousel">
      <div className="logo-track">
        {clientLogos.map((logo, idx) => (
          <div className="logo-card" key={idx}>
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
        {/*  infinite effect */}
        {clientLogos.map((logo, idx) => (
          <div className="logo-card" key={`${idx}-dup`}>
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </div>
      </div>
  );
};

export default LogoMarquee;

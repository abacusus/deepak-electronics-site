import React from "react";

const Footer = () => {
  return (
    <footer
      className="relative text-white"
      style={{ backgroundColor: "#7569E0" }}
    >
      {/* Curved waves */}
      <div className="absolute -top-16 left-0 w-full overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 180"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-[200%] -translate-x-1/4 md:w-full md:translate-x-0"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C240,60 480,60 720,120 C960,180 1200,180 1440,120 L1440,0 L0,0 Z"
            fill="rgba(255,255,255,0.25)"
          />
          <path
            d="M0,140 C240,90 480,100 720,140 C960,180 1200,160 1440,120 L1440,0 L0,0 Z"
            fill="rgba(255,255,255,0.18)"
          />
          <path
            d="M0,155 C240,120 480,135 720,155 C960,175 1200,160 1440,140 L1440,0 L0,0 Z"
            fill="rgba(255,255,255,0.12)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Deepak Electronics</h3>
            <p className="mt-3 text-white/90 text-sm leading-relaxed">
              Quality you can trust. We craft delightful experiences with
              attention to detail and a sprinkle of magic.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a className="hover:underline hover:text-yellow-200" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline hover:text-yellow-200" href="#">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:underline hover:text-yellow-200" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="hover:underline hover:text-yellow-200" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="mailto:deepakelectronics320@gmail.com"
                  className="hover:underline hover:text-yellow-200"
                >
                  deepakelectronics320@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919717099170"
                  className="hover:underline hover:text-yellow-200"
                >
                 +91 97170 99170
                </a>
              </li>
              <li className="text-white/90"> Garhi, Gurugram, India</li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white hover:text-[#7569E0] transition"
                aria-label="Twitter"
              >
                <span className="text-base">𝕏</span>
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white hover:text-[#7569E0] transition"
                aria-label="Instagram"
              >
                <span className="text-base">IG</span>
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white hover:text-[#7569E0] transition"
                aria-label="LinkedIn"
              >
                <span className="text-base">in</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/80">
          <p>© {new Date().getFullYear()} Your Brand. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline hover:text-yellow-200">
              Privacy
            </a>
            <a href="#" className="hover:underline hover:text-yellow-200">
              Terms
            </a>
            <a href="#" className="hover:underline hover:text-yellow-200">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

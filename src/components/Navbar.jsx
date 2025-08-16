import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react"; // icons

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    {
      name: "Products",
      dropdown: [
        "Commercial Scales",
        "Industrial",
        "Jewellery",
        "Lifestyle",
        "Medical",
        "Retail",
        "Test Weights",
        "Waterproof",
      ],
    },
    { name: "Systems & Solutions", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Service", href: "#" },
    { name: "Product Video", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact Us", href: "#" },
  ];

  return (
    <nav className="bg-white shadow-md relative top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
        {/* Logo 
        <div className="text-2xl font-bold text-red-600">MyBrand</div>   I WAS PLANNING TO ADD LOGO IN THE NAVBAR BUT DROPPED THE IDEA ,
        BUT U CAN SEE HOW WOULD IT LOOK BY UNCOMMENTING THIS LOGO PORTION */}
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium items-center">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href || "#"}
                className={`flex items-center gap-1 ${
                  item.name === "Home" ? "text-GRAred-600" : "text-gray-700"
                } hover:text-red-600 transition-colors duration-300`}
              >
                {item.name}
                {item.dropdown && <ChevronDown size={16} />}
              </a>

              {/* Dropdown */}
              {item.dropdown && openDropdown === item.name && (
                <ul className="absolute left-0 mt-0 w-56 bg-[#3b3570] text-white shadow-lg rounded-md py-2 transform transition-all duration-300 opacity-100 scale-100 origin-top">
                  {item.dropdown.map((sub, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-800 transition-colors"
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-4 font-medium">
          {navItems.map((item, idx) => (
            <div key={idx}>
              {/* Main link */}
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === item.name ? null : item.name)
                }
                className="flex justify-between items-center w-full text-gray-700 hover:text-red-600 transition-colors"
              >
                {item.name}
                {item.dropdown && <ChevronDown size={18} />}
              </button>

              {/* Mobile Dropdown */}
              {item.dropdown && openDropdown === item.name && (
                <div className="mt-2 ml-4 space-y-2 animate-slideDown">
                  {item.dropdown.map((sub, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block text-gray-600 hover:text-red-500 transition"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}



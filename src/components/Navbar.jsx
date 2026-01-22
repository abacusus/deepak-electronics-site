import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
    setOpenDropdown(null);
    setMobileOpen(false); // close mobile menu after navigating
  };

  const navItems = [
    { name: "Home", href: "/" },
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
    { name: "About Us", href: "#footer" },
    { name: "Service", href: "#" },
    { name: "Product Video", href: "/productvideo" },
    { name: "Blog", href: "#" },
    { name: "Contact Us", href: "#footer" },
    { name: "Track Your Order", href: "/trackorder" },
  ];

  return (
    <nav className="bg-white sticky top-0 shadow-md left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-3">

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
                className={`flex items-center gap-1 ${item.name === "Home" ? "text-grey-700" : "text-gray-700"
                  } hover:text-red-600 transition-colors duration-300`}
              >
                {item.name}
                {item.dropdown && <ChevronDown size={16} />}
              </a>

              {/* Dropdown for Desktop */}
              {item.dropdown && openDropdown === item.name && (
                <ul className="absolute left-0 mt-0 w-56 bg-[#3b3570] text-white shadow-lg rounded-md py-2">
                  {item.dropdown.map((sub, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleCategoryClick(sub)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-800 transition-colors"
                      >
                        {sub}
                      </button>
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
          aria-label="Open navigation menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col space-y-4 font-medium">
          {navItems.map((item, idx) => (
            <div key={idx}>

              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.name ? null : item.name)
                    }
                    className="flex justify-between items-center w-full text-gray-700 hover:text-red-600 transition-colors"
                  >
                    {item.name}
                    <ChevronDown size={18} />
                  </button>

                  {/* Mobile Dropdown */}
                  {openDropdown === item.name && (
                    <div className="mt-2 ml-4 space-y-2 animate-slideDown">
                      {item.dropdown.map((sub, i) => (
                        <button
                          key={i}
                          onClick={() => handleCategoryClick(sub)}
                          className="block text-gray-600 hover:text-red-500 transition w-full text-left"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (

                <button
                  onClick={() => {
                    navigate(item.href);
                    setMobileOpen(false);
                  }}
                  className="w-full text-left text-gray-700 hover:text-red-600 transition"
                >
                  {item.name}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </nav>
  );
}

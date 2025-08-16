import { useState } from "react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

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
    <nav className="bg-white shadow-md relative w-full z-50">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex space-x-8 justify-center font-medium">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="relative py-5 group"
              onMouseEnter={() => setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {/* Nav Link */}
              <a
                href={item.href || "#"}
                className={`${
                  item.name === "Home" ? "text-red-600" : "text-gray-700"
                } hover:text-red-600 transition-colors`}
              >
                {item.name}
              </a>

              {/* Dropdown */}
              {item.dropdown && openDropdown === item.name && (
                <ul className="absolute left-0 mt-3 w-48 bg-black text-white shadow-lg rounded-sm py-2">
                  {item.dropdown.map((sub, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-800 transition"
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
      </div>
    </nav>
  );
}

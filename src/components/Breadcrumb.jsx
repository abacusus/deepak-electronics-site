import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();

  
  const pathParts = location.pathname.split("/").filter(Boolean);

  const buildPath = (idx) => "/" + pathParts.slice(0, idx + 1).join("/");

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 p-3 bg-gray-300">
      <Link to="/" className="hover:underline">Home</Link>
      {pathParts.map((part, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <span>{">"}</span>
          <Link
            to={buildPath(idx)}
            className="capitalize hover:underline"
          >
            {part.replace(/-/g, " ")}
          </Link>
        </div>
      ))}
    </div>
  );
}

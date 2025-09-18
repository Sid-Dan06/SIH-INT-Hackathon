import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === "/";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const image = localStorage.getItem("userImage"); // store during login if available
    setIsLoggedIn(!!token);
    if (image) setUserImage(image);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userImage");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-green-600 font-bold text-lg"
        >
          <span
            className="material-symbols-outlined text-green-600"
            style={{ fontSize: "32px" }}
          >
            forest
          </span>
          <span>FRA Atlas & DSS</span>
        </Link>

        {/* Center Nav */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
          {isLoggedIn ? (
            <>
              <Link
                to="/client-dashboard"
                className="text-green-600 font-semibold"
              >
                Dashboard
              </Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">
                AI Asset Mapping
              </Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">
                DSS Recommendations
              </Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">
                Reports
              </Link>
              <Link to="#" className="text-gray-700 hover:text-green-600">
                Help
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="text-gray-700 hover:text-green-600">
                Home
              </Link>
              <Link to="/about-us" className="text-gray-700 hover:text-green-600">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-600">
                Contact
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              {isLanding && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600"
                >
                  Skip Tour
                </Link>
              )}
              <Link
                to="/login"
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Avatar links to user settings */}
              <Link
                to="/user-settings"
                className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border hover:ring-2 hover:ring-green-500 transition"
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-gray-600 font-bold">
                    S
                  </span>
                )}
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

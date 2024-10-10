// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "/loangenie-logo.png"; // Assuming the logo is in the public folder

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="LoanGenie Logo" className="h-10" />
        </Link>
        <div className="space-x-6">
          <Link
            to="/apply-loan"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 ease-in-out"
          >
            Apply for Loan
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 ease-in-out"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 ease-in-out"
          >
            Profile
          </Link>
        </div>
        <div>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition-transform duration-300 transform hover:scale-105 ease-in-out"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

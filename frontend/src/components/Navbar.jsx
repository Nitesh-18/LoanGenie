import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          LoanGenie
        </Link>
        <div className="space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/apply"
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

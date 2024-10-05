import React from "react";
import { Link } from "react-router-dom";

const LoginSignup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome to LoanGenie
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Are you a new or existing user?
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-gray-700 mb-2">New User</p>
            <Link
              to="/auth/google/signup"
              className="bg-red-500 text-white py-2 px-4 rounded w-full text-center block hover:bg-red-600 transition duration-200 ease-in-out"
            >
              Sign Up with Google
            </Link>
          </div>
          <div>
            <p className="text-gray-700 mb-2">Existing User</p>
            <Link
              to="/auth/google/login"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full text-center block hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Login with Google
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

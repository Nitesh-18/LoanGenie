import React from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const LoginSignup = () => {
  // Spring animation for route transitions
  const fadeProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div
      style={fadeProps}
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md transition-transform duration-300 ease-in-out transform hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome to LoanGenie
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Are you a new or existing user?
        </p>

        <div className="space-y-6">
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-2">New User</p>
            <a
              href="http://127.0.0.1:5000/login"  // Use href instead of Link for external redirects
              className="bg-red-500 text-white py-3 px-6 rounded w-full text-center hover:bg-red-600 transition duration-200 ease-in-out"
            >
              Sign Up with Google
            </a>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-gray-700 mb-2">Existing User</p>
            <a
              href="http://127.0.0.1:5000/login"  // Same route for both Sign Up and Login
              className="bg-blue-500 text-white py-3 px-6 rounded w-full text-center hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Login with Google
            </a>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default LoginSignup;

// src/App.jsx
import React, { useState } from "react";
import LoanForm from "./components/LoanForm";
import Navbar from "./components/Navbar";
import VideoHero from "./components/VideoHero";
import LoginSignup from "./components/LoginSignup";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeaturesSection";
import Testimonials from "./components/Testimonials";
import FAQSection from "./components/FAQSection";
import CallToAction from "./components/CallToAction";
import ApplyLoan from "./components/ApplyLoan"; // Importing the ApplyLoan component
import { Routes, Route } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const App = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true); // Start showing spinner
    setShowPopup(false); // Hide popup initially

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult("Error in prediction");
    }

    setIsSubmitting(false); // Hide spinner
    setShowPopup(true); // Show result popup
  };

  const formFadeProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { duration: 800 },
    delay: 300,
  });

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-between">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <VideoHero />
              <div className="min-h-screen flex items-center justify-center">
                <animated.div style={formFadeProps} className="w-full py-12">
                  <LoanForm onSubmit={handleFormSubmit} />
                </animated.div>
              </div>
              <FeaturesSection />
              <Testimonials />
              <FAQSection />
              <CallToAction />
            </>
          }
        />
        <Route path="/apply-loan" element={<ApplyLoan />} /> 
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer />

      {/* Popup for result */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prediction Result</h2>
            <p className="text-xl text-center">
              {result === "Error in prediction" ? "Something went wrong" : `Your loan is ${result}`}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Spinner while submitting */}
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full text-blue-500">
            {/* Creative spinner icon */}
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

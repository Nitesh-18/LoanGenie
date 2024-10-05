// src/App.jsx
import React, { useState } from "react";
import LoanForm from "./components/LoanForm";
import Navbar from "./components/Navbar";
import VideoHero from "./components/VideoHero";
import LoginSignup from "./components/LoginSignup"; // Import your LoginSignup component
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import { useSpring, animated } from "react-spring";

const App = () => {
  const [result, setResult] = useState("");

  const handleFormSubmit = async (formData) => {
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setResult(data.result);
  };

  // Spring animation for scroll transition of the form
  const formFadeProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { duration: 800 },
    delay: 300,
  });

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <animated.div
              style={formFadeProps} // Apply your animated styles here
              className="w-full py-12" // Use w-full for full width
            >
              <VideoHero />
              <LoanForm onSubmit={handleFormSubmit} />
            </animated.div>
          }
        />
        <Route path="/login" element={<LoginSignup />} /> {/* Login route */}
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
};

export default App;

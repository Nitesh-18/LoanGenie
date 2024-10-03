// src/App.jsx
import React, { useState } from "react";
import LoanForm from "./components/LoanForm";
import Navbar from "./components/Navbar";
import VideoHero from "./components/VideoHero";
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
      <VideoHero />
      <animated.div style={formFadeProps} className="container mx-auto py-12">
        <LoanForm onSubmit={handleFormSubmit} />
      </animated.div>
    </div>
  );
};

export default App;

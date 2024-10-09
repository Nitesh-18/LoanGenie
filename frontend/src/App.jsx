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
import { Routes, Route } from "react-router-dom";
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
              <FeaturesSection />  {/* Add Features Section */}
              <Testimonials />      {/* Add Testimonials */}
              <FAQSection />        {/* Add FAQ Section */}
              <CallToAction />      {/* Add Call to Action */}
            </>
          }
        />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default App;

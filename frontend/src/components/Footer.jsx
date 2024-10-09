// src/components/Footer.jsx
import React from "react";
import { useSpring, animated } from "react-spring";

const Footer = () => {
  // Spring animation for fade-in
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
    delay: 300,
  });

  return (
    <animated.footer style={fadeInProps} className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} LoanGenie. All rights reserved.
        </p>
      </div>
    </animated.footer>
  );
};

export default Footer;

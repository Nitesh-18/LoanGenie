// src/components/VideoHero.jsx
import { useSpring, animated } from "react-spring";
import { useEffect } from "react";
import "../styles/hero.css"; // Add necessary styles for hero section

const VideoHero = () => {
  const videoUrl = "/loan-bg.mp4"; // Local video from public folder

  const [fadeProps, setFade] = useSpring(() => ({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { duration: 1000 },
  }));

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setFade({ opacity: 0.7, transform: "translateY(-20px)" });
      } else {
        setFade({ opacity: 1, transform: "translateY(0)" });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setFade]);

  return (
    <animated.div style={fadeProps} className="hero-section">
      <div className="video-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/loan-bg.mp4" // Ensure the path is relative to public
          className="hero-video"
        />
      </div>

      <div className="overlay-text">
        <h1 className="text-white text-4xl font-bold">Welcome to LoanGenie</h1>
        <p className="text-white text-lg">
          Your trusted loan approval prediction system
        </p>
      </div>
    </animated.div>
  );
};

export default VideoHero;

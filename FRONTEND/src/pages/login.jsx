import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img1 from "../components/blog/img/xd.jpg";
import img2 from "../assets/vic.jpg";

function Login() {
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);
  const containerRef = useRef(null);
  const lineRef = useRef(null); // Ref for the middle line

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

    // Fade-in animation for the container
    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, ease: "power2.out" }
    );

    // Panels animation
    tl.fromTo(
      ".left-panel",
      { x: "-100%" },
      { x: "0%", ease: "power2.out" },
      "<0.5"
    );
    tl.fromTo(
      ".right-panel",
      { x: "100%" },
      { x: "0%", ease: "power2.out" },
      "<0.5"
    );

    // Middle line animation (top to bottom)
    tl.fromTo(
      lineRef.current,
      { height: "0%" },
      { height: "100%", ease: "power2.out" },
      "<0.5"
    );
  }, []);

  const navigate = useNavigate();

  const handleLogin = async function (e) {
    e.preventDefault();

    try {
      const response = await axios.post("/users/login", {
        password: password,
        email: email,
      });
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      setError("some error occurred");
      console.error(error);
    }

    navigate("/signUp");
  };

  return (
    <div
    ref={containerRef}
    className="h-screen w-screen flex flex-col md:flex-row overflow-hidden font-sans bg-gray-900 text-white"
  >
    {/* Left Panel */}
    <div
      className="left-panel w-full h-screen flex flex-col justify-center items-center px-6 py-8 sm:p-12 md:w-1/2 relative"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(0,0,0,0.6)", // Dark overlay for contrast
      }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-300 mb-4 md:mt-12 lg:mt-16 text-center">
        Welcome to Our Historical Archive
      </h1>
      <p className="italic text-sm sm:text-base md:text-lg text-gray-300 text-center mb-8">
        "Preserving the echoes of time."
      </p>
      <form onSubmit={handleLogin} className="w-full max-w-xs sm:max-w-sm">
        <div className="mb-6">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            className="w-full p-3 bg-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-amber-500 to-orange-700 rounded-lg font-bold text-white hover:opacity-90 transition-all duration-200 text-sm sm:text-base"
        >
          LOG IN
        </button>
        <p className="text-center text-xs sm:text-sm text-gray-400 mt-6">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
        </p>
        <p className="text-center text-xs sm:text-sm text-gray-400 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signUp"
            className="text-orange-400 font-semibold hover:underline ml-1"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  
    {/* Right Panel */}
    <div
      className="right-panel hidden md:flex w-full md:w-1/2 flex-col justify-center items-center px-8 py-16 relative"
      style={{
        backgroundImage: `url(${img2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "darken",
        backgroundColor: "rgba(0,0,0,0.5)", // Overlay for better text readability
      }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-300 mb-6 text-center">
        Explore the Legacy of Time
      </h2>
      <p className="max-w-lg text-center text-sm sm:text-base md:text-lg text-gray-200 mb-8">
        Our mission is to preserve and showcase the historical milestones that
        shaped humanity. Step into the past to create a better future.
      </p>
      <blockquote className="text-sm sm:text-base md:text-lg text-gray-300 text-center italic px-4">
        "Those who cannot remember the past are condemned to repeat it."
      </blockquote>
    </div>
  </div>
  );
}

export default Login;
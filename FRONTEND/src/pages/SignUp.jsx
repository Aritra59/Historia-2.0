import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../components/blog/img/xd.jpg";
import img2 from "../assets/vic.jpg";
import {useDispatch} from "react-redux"
import { signUp,logout } from "../features/userAuth";
// import Loader from "../components/loader/Loader";

function SignUp() {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [profilePic, setProfilePic] = useState(null);


  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const dispatcher = useDispatch()
  const navigate = useNavigate();

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
      ".right-panel",
      { x: "100%" },
      { x: "0%", ease: "power2.out" },
      "<0.5"
    );
    tl.fromTo(
      ".left-panel",
      { x: "-100%" },
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
// signUp logic -- a) post signup req (b) add res data to state (c) send cookies (d) handle errors(clear state and cookies)
  const handleSignUp = async function (e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("avatar", profilePic);

// return (<Loader/>)
      const response = await axios.post("https://historia-2-0.onrender.com/users/signUp", formData);
      
      console.log(response.data.data);
      dispatcher(signUp(response.data))

     await axios.get(`https://historia-frontend.onrender.com/users/sendCookies/${response.data?.data?._id}`,{ withCredentials: true }) 
     navigate("/")

    } catch (error) {
      dispatcher(logout())
      // await axios.get("users/clearCookies/")
      console.error("Error during sign-up:", error);
    }

  
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen flex flex-col md:flex-row overflow-hidden font-sans bg-gray-900 text-white"
    >
      {/* Left Panel */}
      <div
        className="left-panel hidden md:flex w-full md:w-1/2 flex-col justify-center items-center px-8 py-16 relative"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "darken",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-300 mb-6 text-center">
          Become a Keeper of History
        </h2>
        <p className="max-w-lg text-center text-sm sm:text-base md:text-lg text-gray-200 mb-8">
          Join us to preserve and celebrate the rich tapestry of human history.
        </p>
        <blockquote className="text-sm sm:text-base md:text-lg text-gray-300 text-center italic px-4">
         { "History lives in those who remember."}
        </blockquote>
      </div>

      {/* Right Panel */}
      <div
        className="right-panel w-full h-screen flex flex-col justify-center items-center px-6 py-8 sm:p-12 md:w-1/2 relative"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-amber-300 mb-4 md:mt-12 lg:mt-16 text-center">
          Sign Up for Historical Insights
        </h1>
        <p className="italic text-sm sm:text-base md:text-lg text-gray-300 text-center mb-8">
          {"Connecting the past to the present for the future."}
        </p>
        <form
          onSubmit={
            handleSignUp
          
        
          }
          className="w-full max-w-xs sm:max-w-sm"
          encType="multipart/form-data"
        >
          <div className="mb-6">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 bg-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
          <div className="mb-6">
            <input
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full p-3 bg-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              style={{ height: "3rem" }}
            />
          </div>
          <button
            type="submit"
            
            className="w-full p-3 bg-gradient-to-r from-amber-500 to-orange-700 rounded-lg font-bold text-white hover:opacity-90 transition-all duration-200 text-sm sm:text-base"
          >
            SIGN UP
          </button>
          <p className="text-center text-xs sm:text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-400 font-semibold hover:underline ml-1"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

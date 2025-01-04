import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { assets } from "../assets/assets";
import { FaFacebook, FaInstagram, FaTwitter, FaSearch } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {login,logout} from "../features/userAuth"
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selector = useSelector(state=>state.auth.authState)
  const dispatcher = useDispatch()
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  //
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/users/isUserLoggedIn/');
        if (response.data?.data.userAuthorized !== true) {
          console.log(response.name?.status);
          dispatcher(logout());
        } 

        else {
          try {
            const response2 = await axios.get('/users/getUserProfile');
            dispatcher(login(response2.data));
          } catch (error) {
            console.error("Error fetching user profile:", error);
            dispatcher(logout()); 
          }
        }
        
      } catch (error) {
        console.error("Error checking if user is logged in:", error);
        dispatcher(logout()); 
      }
    })();


  }, []);
  
  


  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  return (
    <div>
      <header className="relative pt-[4.1rem]">
        <nav className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-customBg">
          {/* Logo */}
          <h1 className="text-black text-lg md:text-3xl md:ml-9 ml-2 font-bold tracking-widest">
            <Link to="/" >Historia</Link>
          </h1>
          {/* Hamburger Menu for Mobile */}
          <div className="flex items-center justify-between md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-1xl"
              aria-label="Open Menu" // Added accessible label for better usability
            >
              {/* Replaced ☰ with AiOutlineMenu for a modern icon */}
              <AiOutlineMenu size={24} />
            </button>
          </div>

          {/* Nav Links for Desktop */}
          <ul className="hidden md:flex md:flex-row md:justify-end md:space-x-4 text-black gap-4 text-lg font-medium mt-2 mr-9 md:mt-0 ">
            <NavLink
              to="/"
              className="text-black relative group transition duration-200 hover:text-yellow-500 transform hover:-translate-y-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
              <hr className="block h-[3.5px] bg-emeraldHover" />
              {/* <span className="block h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span> */}
            </NavLink>
            <NavLink
              to="/event"
              className="text-black relative group transition duration-200 hover:text-yellow-300 transform hover:-translate-y-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
              <hr className="block h-[3.5px] bg-emeraldHover" />
              {/* <span className="block h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span> */}
            </NavLink>
            <NavLink
              to="/gallery"
              className="text-black relative group transition duration-200 hover:text-yellow-500 transform hover:-translate-y-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Galleries
              <hr className="block h-[3.5px] bg-emeraldHover" />
              {/* <span className="block h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span> */}
            </NavLink>
            <NavLink
              to="/stories"
              className="text-black relative group transition duration-200 hover:text-yellow-500 transform hover:-translate-y-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
              <hr className="block h-[3.5px] bg-emeraldHover" />
              {/* <span className="block h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span> */}
            </NavLink>
            <NavLink
              to="/places"
              className="text-black relative group transition duration-200 hover:text-yellow-500 transform hover:-translate-y-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Places
              <hr className="block h-[3.5px] bg-emeraldHover" />
              {/* <span className="block h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span> */}
            </NavLink>
            {selector.isUserLoggedIn?
            (<NavLink to="/profile">
              <img src={selector.userData.data.avatar || null} className="h-10 w-10 
              rounded-[30rem] bg-contain" alt="" />
            </NavLink>)
            :
            (<NavLink
              to="/login"
              className="text-black relative group transition duration-200 hover:text-yellow-500 transform hover:-translate-y-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
              <hr className="block h-[3.5px] bg-emeraldHover" />
              {/* <span className="block h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span> */}
            </NavLink>)
            }
          </ul>

          {/* Nav Links - Partial-Screen Overlay for Mobile */}
          <div
            className={`fixed top-0 left-0 h-full w-2/5 inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex flex-col items-start p-8 space-y-6 transition-transform duration-300 ease-in-out ${
              isMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            } md:hidden`}
          >
            <button
              onClick={toggleMenu}
              className="text-white text-2xl mb-4"
              aria-label="Close Menu" // Added accessible label for better usability
            >
              {/* Replaced ✕ with AiOutlineClose for a modern close icon */}
              <AiOutlineClose size={24} />
            </button>

            {/* Search Bar (New Feature) */}
            <div className="flex items-center w-full p-2 bg-transparent rounded-md backdrop-blur-sm bg-opacity-70 ">
              <input
                type="text"
                placeholder="Type a location or a historical name..."
                className="bg-transparent w-full outline-none text-white placeholder-white-400 text-sm "
              />
              <FaSearch className="text-white-300 ml-2 text-white " />
            </div>

            <Link
              to="/"
              className="text-white text-xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/event"
              className="text-white text-xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/gallery"
              className="text-white text-xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Galleries
            </Link>
            <Link
              to="/stories"
              className="text-white text-xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Stories
            </Link>
            <Link
              to="/places"
              className="text-white text-xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Places
            </Link>
            <Link
              to="/login"
              className="text-white text-xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signUp"
              className="text-white text-xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              SignUp
            </Link>
            <div className="mt-auto flex space-x-4 ">
              <a href="#" className="text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white">
                <FaTwitter size={20} />
              </a>
            </div>

            {/* extra feature for for places.. leave it for now */}

            {/* <div className="w-full">
              <button
                onClick={toggleSubmenu}
                className="flex items-center justify-between w-full text-white text-xl cursor-pointer"
              >
                Places
                <span>{submenuOpen ? "▲" : "▼"}</span>
              </button>
              {submenuOpen && (
                <ul className="ml-4 mt-2 space-y-2 text-lg">
                  <li>
                    <Link to="/places/cities" className="text-gray-300">
                      Cities
                    </Link>
                  </li>
                  <li>
                    <Link to="/places/villages" className="text-gray-300">
                      Villages
                    </Link>
                  </li>
                </ul>
              )}
            </div> */}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

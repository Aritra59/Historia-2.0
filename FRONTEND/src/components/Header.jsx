import { assets } from "../assets/assets";
import gsap from "gsap";
import { useRef, useEffect } from "react";

const Header = () => {
  const textContainerRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      textContainerRef.current,
      { y: 150, opacity: 0 }, // Start from below the image
      {
        y: 0,
        opacity: 1,
        duration: 2, // Longer duration for smoother animation
        ease: "power3.out", // Smooth easing function
        delay: 0.3, // Optional delay for a polished effect
      }
    );
  }, []);

  return (
    <div>
      <div className="relative">
        {/* Image with overlay */}
        <img
          className="h-[65vh] sm:h-[60vh] md:h-[70vh] w-full object-cover bg-center z-0"
          src={assets.Banner}
          alt=""
        />
        {/* Dark Overlay */}
        {/* Overlayed text container */}
        <div className="absolute inset-0 flex items-center justify-self-start ml-6 ">
          <div
            ref={textContainerRef}
            className="text-container text-white md:p-6 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[100%]  "
          >
            <h1 className="text-2xl sm:text-xl md:text-4xl lg:text-6xl font-bold md:py-4 py-1 ">
              Discover the unknown
            </h1>
            <span className="block text-2xl sm:text-xl md:text-4xl lg:text-6xl font-bold ">
              Historical places
            </span>
            <p className="text-base sm:text-lg md:text-xl lg:text-xl mt-6 pb-4">
              Explore the underrated places across West Bengal and discover
              detailed stories
            </p>
            <div className="relative mt-4 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <form onSubmit={e=>{navigate(`/searchResults/${data}`)}}>
              <input
                className="p-3 pl-4 w-full rounded-lg bg-opacity-75 bg-black/50 border placeholder-gray-300 text-sm md:text-base text-white outline-none focus:ring-2 focus:ring-yellow-500 transition-all ease-in-out duration-200"
                type="text"
                placeholder="Type a location or a historical name..."
                onChange={(e)=>setData(e.target.value)} value={data}
              />
             <button  type="submit" >
              <img    src={assets.search_icon}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                alt="Search Icon"/>
              </button> 
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

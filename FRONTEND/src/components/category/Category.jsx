import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import images from "../category/images/asset";

gsap.registerPlugin(ScrollTrigger);

const Category = () => {
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      linksRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2, // Delay between each element
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".container", // Trigger animation when this container is visible
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="container mx-auto relative max-w-full w-full object-cover bg-center z-0">
      <h2 className="text-3xl font-bold text-center mb-8">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center px-4 h-auto w-full">
        <Link
          to="/event"
          className="relative overflow-hidden group rounded-xl"
          ref={(el) => (linksRef.current[0] = el)}
        >
          <div className="w-full h-32 sm:h-36 md:h-40 lg:h-48">
            <img
              src={images.img1}
              alt="Events"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 blur-sm rounded-xl"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white text-lg md:text-xl font-bold bg-black/50 group-hover:bg-black/70 transition-colors duration-300 rounded-xl">
              EVENTS
            </p>
          </div>
        </Link>

        <Link
          to="/museum"
          className="relative overflow-hidden group rounded-xl"
          ref={(el) => (linksRef.current[1] = el)}
        >
          <div className="w-full h-32 sm:h-36 md:h-40 lg:h-48">
            <img
              src={images.img1}
              alt="Museums"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 blur-sm rounded-xl"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white text-lg md:text-xl font-bold bg-black/50 group-hover:bg-black/70 transition-colors duration-300 rounded-xl">
              MUSEUMS
            </p>
          </div>
        </Link>

        <Link
          to="/culture"
          className="relative overflow-hidden group rounded-xl"
          ref={(el) => (linksRef.current[2] = el)}
        >
          <div className="w-full h-32 sm:h-36 md:h-40 lg:h-48">
            <img
              src={images.img3}
              alt="Culture"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 blur-sm rounded-xl"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white text-lg md:text-xl font-bold bg-black/50 group-hover:bg-black/70 transition-colors duration-300 rounded-xl">
              CULTURE
            </p>
          </div>
        </Link>

        <Link
          to="/monuments"
          className="relative overflow-hidden group rounded-xl"
          ref={(el) => (linksRef.current[3] = el)}
        >
          <div className="w-full h-32 sm:h-36 md:h-40 lg:h-48">
            <img
              src={images.img4}
              alt="Monuments"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 blur-sm rounded-xl"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white text-lg md:text-xl font-bold bg-black/50 group-hover:bg-black/70 transition-colors duration-300 rounded-xl">
              MONUMENTS
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Category;

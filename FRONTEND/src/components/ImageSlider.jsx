import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import images from '../assets/assets';
import LazyLoad from 'react-lazyload';

const ImageSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // Clone the images once to fill the gap, instead of creating too many clones
    const slides = Array.from(slider.children);
    const totalWidth = slider.offsetWidth;
    let currentWidth = 0;

    // Dynamically clone images, but only once to avoid performance issues
    slides.forEach((slide) => {
      currentWidth += slide.offsetWidth;
    });

    // If the total width is not enough, duplicate only once
    if (currentWidth < totalWidth) {
      slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
      });
    }

    // GSAP animation to slide images infinitely from right to left
    gsap.to(slider, {
      x: `-${slider.offsetWidth / 2}px`, // Move the slider from right to left
      ease: "none",
      repeat: -1,
      duration: 30, // Adjust this value to control the speed
    });
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-[8rem] sm:h-[10rem] md:h-[15rem] lg:h-[17rem] ">
      <div
        ref={sliderRef}
        className="flex items-center w-max space-x-4"
        style={{ willChange: "transform" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-34 h-24 sm:w-32 sm:h-32 md:w-[18rem] md:h-52 lg:w-[18rem] lg:h-52 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl transform"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

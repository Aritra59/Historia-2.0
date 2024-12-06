import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <footer className="relative py-8 sm:py-10 md:py-12 lg:py-16 ">
      <div className="absolute inset-0">
        <div
          className="bg-cover bg-center w-full h-full opacity-10"
          style={{
            backgroundImage: `url('path/to/your/background-image.jpg')`, // Replace with a valid image URL
          }}
        ></div>
      </div>

      <motion.div
        className="relative mx-auto px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl text-gray-800" 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-wrap justify-between gap-y-8">
          {/* About Section */}
          <div className="w-full sm:w-1/2 md:w-[22%] lg:w-[20%] text-center md:text-left">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
              About Historia
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed md:leading-loose">
              We aim to promote historical awareness through compelling
              storytelling, innovative tools, and engaging community
              initiatives. Our goal is to educate, inspire, and help individuals
              connect with the past for a brighter future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2 md:w-[19%] text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-800"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-600 hover:text-gray-800"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                 
                  className="text-gray-600 hover:text-gray-800"
                >
                 Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="w-full sm:w-1/2 md:w-[19%] text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="#visitor-info"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Visitor's Information
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-gray-600 hover:text-gray-800">
                  Events
                </Link>
              </li>
              <li>
                <a href="#notice" className="text-gray-600 hover:text-gray-800">
                  Notice
                </a>
              </li>
              <li>
                <Link
                  href="#contact-us"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="w-full sm:w-1/2 md:w-[19%] text-center md:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Connect With Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="#facebook"
                className="text-gray-600 hover:text-gray-800"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-square text-xl sm:text-2xl"></i>
              </a>
              <a
                href="#twitter"
                className="text-gray-600 hover:text-gray-800"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl sm:text-2xl"></i>
              </a>
              <a
                href="#instagram"
                className="text-gray-600 hover:text-gray-800"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl sm:text-2xl"></i>
              </a>
              <a
                href="#youtube"
                className="text-gray-600 hover:text-gray-800"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-xl sm:text-2xl"></i>
              </a>
            </div>
            <div className="mt-4 text-sm sm:text-base">
              <span className="block text-gray-600">Visits:</span>
              <span className="text-gray-800 font-bold text-lg">540,304</span>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900">
            The Historia
          </h2>
        </motion.div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t pt-6 text-center text-sm sm:text-base text-gray-600">
          <p>
            &copy; 2024 Historia - All Rights Reserved | Hosted & Managed by{" "}
            <a
              href="#alpha-web"
              className="text-gray-800 font-semibold hover:underline"
            >
              Time Keppers
            </a>
          </p>
        </div>
      </motion.div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition"
        aria-label="Back to top"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <i className="fas fa-arrow-up"></i>
      </motion.button>
    </footer>
  );
};

export default AboutSection;

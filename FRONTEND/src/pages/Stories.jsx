import{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader/Loader";

const Catalog = () => {
  const [animate, setAnimate] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Fetch data from API on component mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const allPostRes = await axios.get("https://historia-frontend.onrender.com/posts/getLimitedPosts/?count=10");
        if (!allPostRes.data.data)
          throw new Error("Stories fetching error or not logged in");

        console.log(allPostRes.data.data);
        setFetchedData(allPostRes.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, []);

  // Show loader during data fetch
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-customBg">
      {/* Header */}
      <header className="bg-customBg shadow">
        <div className="container mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">North 24 Parganas</div>
        </div>
      </header>

      {/* Search Bar and Sort Button */}
      <div className="container mx-auto px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search By Name"
            className="w-full px-4 py-2 border-b border-gray-400 focus:outline-none focus:ring-0 text-lg bg-transparent"
          />
        </div>
        <button className="text-gray-700 self-end sm:self-auto text-xl px-6 py-3 rounded w-[8rem]">
          Sort By
        </button>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
        {fetchedData.map((data, index) => (
          <Link
            to={`/viewPage/${data._id}`} // Dynamic route
            key={data._id}
            className={`relative bg-white rounded-3xl overflow-hidden shadow-md mx-auto w-full max-w-xs opacity-0 transform translate-y-10 transition-all duration-700 ease-in-out ${
              animate ? `animate-card-${index + 1}` : ""
            }`}
            style={{ aspectRatio: "9 / 11" }}
          >
            <img
              src={data?.postImg[0]}
              alt={data.title}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-500 ease-in-out hover:opacity-90"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute w-full px-4 py-4 text-white bottom-3 transition-opacity duration-500 ease-in-out hover:opacity-100">
              <div className="font-bold text-lg">{data.title}</div>
              <div className="text-sm">{data.postLocation}</div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        /* Keyframes for card animation */
        @keyframes card-animation {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Apply card animation */
        .animate-card-1 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.1s;
        }
        .animate-card-2 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.3s;
        }
        .animate-card-3 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.5s;
        }
        .animate-card-4 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.7s;
        }
        .animate-card-5 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.9s;
        }
        .animate-card-6 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.9s;
        }
        .animate-card-7 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.9s;
        }
        .animate-card-8 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.9s;
        }
        .animate-card-9{
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.9s;
        }
        .animate-card-10 {
          animation: card-animation 0.6s ease-out forwards;
          animation-delay: 0.9s;
        }
        
        /* Hover scale effect */
        .hover\\:scale-105:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }

        /* Smooth opacity transition */
        .transition-opacity {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Catalog;
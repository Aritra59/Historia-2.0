import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel"; // For featured stories carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import H2 from "../assets/H2.jpg";

const Catalog = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    location: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const selector = useSelector(state => state.auth.authState);

  // Fetch data
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const allPostRes = await axios.get("posts/getLimitedPosts/?count=10");
        if (!allPostRes.data.data) throw new Error("Stories fetching error");
        setFetchedData(allPostRes.data.data);
        setFeaturedStories(allPostRes.data.data); // All posts can be featured
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, []);

  // Filter data based on search query and filters
  const filteredData = fetchedData.filter((data) =>
    data.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filters.category ? data.category === filters.category : true) &&
    (filters.date ? data.date === filters.date : true) &&
    (filters.location ? data.location === filters.location : true)
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Hero Section (Static) */}
      <div className="relative h-96 flex items-center justify-center">
        <img
          src={H2} // Replace with your hero image
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative text-center">
          <h2 className="text-4xl font-bold text-white">Explore the Stories That Shaped our Country</h2>
          <p className="mt-2 text-lg text-gray-300">Dive into history with captivating tales from around the globe</p>
        </div>
      </div>

      {/* Featured Stories Carousel (Dynamic) */}
      <div className="container mx-auto px-6 sm:px-12 py-8">
        <h3 className="text-2xl font-bold mb-4">Featured Stories</h3>
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
          {featuredStories.map((story) => (
            <div key={story._id} className="relative h-96">
              <img
                src={story.postImg[0]}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h4 className="text-white font-semibold text-xl">{story.title}</h4>
                <p className="text-gray-300 text-sm">{story.postLocation}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 sm:px-12 py-6 flex flex-wrap gap-4">
        <select
          name="category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        >
          <option value="">All Categories</option>
          <option value="war">War</option>
          <option value="culture">Culture</option>
          <option value="politics">Politics</option>
        </select>
        {/* <input
          type="date"
          name="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        /> */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
        />
      </div>

      {/* Stories Grid */}
      <div className="container mx-auto px-6 sm:px-12 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((data) => (
            <Link
              to={selector.isUserLoggedIn ? `/viewPage/${data._id}` : "/login"}
              key={data._id}
              className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative bg-white/80 backdrop-blur-md"
            >
              <img
                src={data?.postImg[0]}
                alt={data.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-white font-semibold text-lg">{data.title}</h2>
                <p className="text-gray-300 text-sm">{data.postLocation}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className={`${isDarkMode ? "bg-gray-800" : "bg-gray-200"} py-8`}>
        <div className="container mx-auto px-6 sm:px-12 text-center">
          <p className="text-sm">Â© 2025 Historical Stories. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};


export default Catalog;

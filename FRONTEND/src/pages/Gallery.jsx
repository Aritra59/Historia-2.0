import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const Gallery = () => {
  const galleryRef = useRef();
  const [response, setResponse] = useState([]);
  const [handleOwner, setHandleOwner] = useState("");
  const [likeHandler, setLikeHandler] = useState([]);
  const [likes, setLikes] = useState([]);
  const [deleteState, setDeleteState] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // For enlarged image

  // const selector = useSelector((state) => state.auth.authState.userData);
const navigator = useNavigate()
  // Fetch posts
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("https://historia-2-0-1.onrender.com/posts/getLimitedPosts/?count=10",{
          withCredentials:true
        });
        setResponse(res.data.data || []);

        if (res.data.data.length > 0) {
          setHandleOwner(res.data.data[0]?.ownerData?.[0]?.username || "johnDoe");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    })();
  }, [deleteState]);

  // Fetch likes
  useEffect(() => {
    (async () => {
      try {
        const likeData = await axios.get(`https://historia-2-0-1.onrender.com/posts/fetchLikes`,
          { withCredentials: true });
        setLikes(likeData.data.data || []);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    })();
  }, [response]);

  // GSAP animation after data loads
  useEffect(() => {
    if (galleryRef.current && response.length > 0) {
      gsap.fromTo(
        galleryRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
      );
    }
  }, [response]);

  const handleLikes = async (item) => {
    try {
      const likeState = await axios.get(`https://historia-2-0-1.onrender.com/posts/likeSome/${item._id}`, { withCredentials: true });
      setLikeHandler(likeState?.data?.data || []);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  // Handle modal image
  const openImageModal = (imgUrl) => setSelectedImage(imgUrl);
  const closeImageModal = () => setSelectedImage(null);

  return (
    <div className="bg-gray-200 text-black">
      {/* Banner Section */}
      <div
        className="relative w-full h-96 flex flex-col items-center justify-center text-center px-6 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(https://img.lovepik.com/background/20211021/large/lovepik-the-background-of-chinese-wind-banner-image_500353034.jpg)`
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 text-white max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide">Rediscover the Forgotten Past</h1>
          <p className="mt-3 text-lg sm:text-xl font-light">Explore the rich history, culture, and untold stories of legendary places.</p>
          <button onClick={()=>navigator("/stories")}
          className="mt-6 px-6 py-3 bg-white text-black font-semibold text-lg rounded-lg shadow-md hover:bg-gray-200 transition">
            Start Exploring →
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide">Gallery</h2>

        <div
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {response.map((item, index) => (
            <div
              key={item._id}
              className={`relative bg-white text-black rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 ${
                index % 3 === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
              }`}
            >
              <img
                src={item.postImg?.[0] || "https://via.placeholder.com/200x250"}
                alt={item.title || "Post Image"}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={() => openImageModal(item.postImg?.[0])}
              />

              <div className="p-4 flex justify-between">
                <div className="flex-col">
                  <h3 className="text-lg font-semibold">{item.title || "johnDoe"}</h3>
                  <p className="text-gray-500 text-sm">{item?.postLocation || "Location Unknown"}</p>
                  <p className="text-gray-400 text-xs">
                    {item.updatedAt?.slice(0, 10) || item.createdAt?.slice(0, 10) || "10-10-1999"}
                  </p>
                </div>

                <div className="flex">
                  <button onClick={() => handleLikes(item)}>
                    {(likeHandler.includes(item._id) || likes.includes(item._id)) ? "💗" : "🤍"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Image View */}
      {selectedImage && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    onClick={closeImageModal}
  >
    <img
      src={selectedImage}
      alt="Enlarged"
      className="w-[90vw] h-[90vh] object-contain rounded-lg shadow-2xl"
    />
  </div>
)}

    </div>
  );
};

export default Gallery;

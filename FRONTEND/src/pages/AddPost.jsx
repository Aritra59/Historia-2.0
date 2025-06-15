import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import img2 from "../assets/vic.jpg";

function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [howToReach, setHowToReach] = useState("");
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animation for the form container
    gsap.fromTo(
      ".form-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  const handleFileChange = (e) => {
    const imgFiles = e.target.files;
    setFiles([...imgFiles]);

    // Generate image previews
    const previews = Array.from(imgFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postLocation", location);
    formData.append("howToReachContent", howToReach);

    for (let i = 0; i < files.length; i++) {
      formData.append("postImg", files[i]);
    }

    try {
      setLoading(true);
      const response = await axios.post("https://historia-2-0-1.onrender.com/posts/addPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64"
        style={{
          backgroundImage: `url(${img2})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold drop-shadow-lg">
            Share Your Historical Story
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center  bg-[#F6F2E8] justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="form-container bg-white max-w-md w-full p-6 rounded-lg shadow-lg border border-orange-200">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Submit Your Details
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            {/* Title Input */}
            <div>
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Enter Title"
                className="w-full px-3 py-2 text-base bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                required
              />
            </div>
            <div>
              <textarea
                id="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="Describe your story..."
                className="w-full px-3 py-2 text-base bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Location Input */}
            <div>
              <input
                type="text"
                id="location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                placeholder="Location (e.g., City, Place Name)"
                className="w-full px-3 py-2 text-base bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                required
              />
            </div>

            {/* How to Reach Input */}
            <div>
              <textarea
                id="howToReach"
                onChange={(e) => setHowToReach(e.target.value)}
                value={howToReach}
                placeholder="Provide travel directions or tips"
                className="w-full px-3 py-2 text-base bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
                rows="3"
                required
              ></textarea>
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="files"
                className="block text-base font-medium text-gray-700 mb-1"
              >
                Upload Images (Preview Below)
              </label>
              <input
                type="file"
                id="files"
                onChange={handleFileChange}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
                multiple
              />
            </div>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="h-24 w-full relative">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                ))}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-orange-600 hover:to-red-700 hover:scale-105 transition-transform duration-300"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
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
  const [coverImg, setCoverImg] = useState(null);
  const [otherImgs, setOtherImgs] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);
  const [otherPreviews, setOtherPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      ".form-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverImg(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleOtherImgsChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 2); // Limit to 2
    setOtherImgs(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setOtherPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postLocation", location);
    formData.append("howToReachContent", howToReach);

    if (coverImg) {
      formData.append("postImg", coverImg); // Cover first
    }
    otherImgs.forEach((img) => formData.append("postImg", img)); // Others next

    try {
      setLoading(true);
      await axios.post("https://historia-2-0-1.onrender.com/posts/addPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },withCredentials:true
      });
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Upload error:", error);
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
        style={{ backgroundImage: `url(${img2})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold drop-shadow-lg">
            Share Your Historical Story
          </h1>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center bg-[#F6F2E8] justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="form-container bg-white max-w-md w-full p-6 rounded-lg shadow-lg border border-orange-200">
          <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
            Submit Your Details
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            {/* Title */}
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              required
            />

            {/* Content */}
            <textarea
              placeholder="Describe your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              required
            ></textarea>

            {/* Location */}
            <input
              type="text"
              placeholder="Location (e.g., City, Place Name)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              required
            />

            {/* How to Reach */}
            <textarea
              placeholder="Provide travel directions or tips"
              value={howToReach}
              onChange={(e) => setHowToReach(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg"
              required
            ></textarea>

            {/* Cover Image Upload */}
            <div>
              <label className="font-medium">Upload Cover Image</label>
              <input
                type="file"
                onChange={handleCoverChange}
                accept="image/*"
                className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-lg"
                required
              />
              {coverPreview && (
                <div className="mt-2">
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="h-24 w-full object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Other Images Upload */}
            <div>
              <label className="font-medium">Upload Other Images (max 2)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleOtherImgsChange}
                className="w-full px-3 py-2 mt-1 bg-gray-100 border border-gray-300 rounded-lg"
              />
              {otherPreviews.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {otherPreviews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Other Image ${i + 1}`}
                      className="h-24 w-full object-cover rounded-md shadow"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-lg hover:scale-105 transition-transform duration-300"
            >
              Submit Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
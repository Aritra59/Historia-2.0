import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader/Loader.jsx";
import axios from "axios";
import { signUp } from "../features/userAuth.js";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const selector = useSelector((state) => state.auth.authState);
  const dispatcher = useDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [location, setLocation] = useState("");

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("fullname", fullName);
      formData.append("avatar", avatar);
      formData.append("userLocation", location);

      const response = await axios.patch("https://historia-2-0.onrender.com/users/editUser", formData,{
        "ContentType":"multipart/form-data",
        withCredentials:true
      },
      
    );
      dispatcher(signUp(response.data));
      await axios.get(`users/sendCookies/${response.data?.data?._id}`,{
        withCredentials:true
      });

      console.log(response.data.data);

      navigator("/");
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };

  if (!selector?.isUserLoggedIn) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-orange-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Location Input */}
          <div>
            <label htmlFor="userLocation" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="userLocation"
              name="userLocation"
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
              placeholder="Enter location"
              required
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-md shadow-md hover:from-orange-600 hover:to-red-700 hover:scale-105 transition-transform duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
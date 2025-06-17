import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userAuth";

function Profile() {
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [deleteState, setDeleteState] = useState({});
  const [showButton, setShowButton] = useState(true);

  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const userState = useSelector((state) => state.auth.authState.userData);

  // Fetch user profile data
  useEffect(() => {
    async function updateData() {
      try {
        const response = await axios.get("/users/getUserProfile", {
          withCredentials: true,
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    updateData();
  }, []);

  // Fetch user posts
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("posts/getUserPosts", {
          withCredentials: true,
        });
        if (response.status !== 200) throw new Error(response);
        setPosts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [deleteState]);

  // Scroll listener for showing/hiding button
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowButton(scrollTop < lastScrollTop || scrollTop < 100);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOutMethod = async () => {
    try {
      const logoutStatus = await axios.get("users/logout", {
        withCredentials: true,
      });
      if (!logoutStatus) throw new Error("Logout failure");
      dispatcher(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  async function deletePost(e, postId) {
    try {
      const deletedPost = await axios.get(`posts/deletePost/${postId}`);
      setDeleteState(deletedPost.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (Array.isArray(data) && data.length <= 0) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F2E8] p-6 font-sans text-black">
      <div className="flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full bg-gray-300 flex justify-center items-center text-2xl font-bold">
          <img
            src={data.avatar}
            className="bg-cover h-full w-full rounded-full"
            alt=""
          />
        </div>
        <h1 className="mt-4 text-3xl font-semibold">
          {data.username || "JohnDoe"} {data.admin === true ? "(admin)" : null}
        </h1>

        <button
          onClick={() => navigate("/profile/edit")}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Edit profile
        </button>

        <div className="flex gap-2">
          <button
            onClick={logOutMethod}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>

          {data.admin === true && (
            <button
              onClick={() => navigate("/admin/dashboard/users")}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Admin
            </button>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div className="flex gap-6 mb-6">
          <button className="px-4 py-2 text-gray-500 ">⭐</button>
          <button className="px-4 py-2 bg-black text-white rounded-full">
            Gallery {`(${posts.length})`}
          </button>
          <button className="px-4 py-2 text-gray-500">⭐</button>
        </div>

        <p className="my-10 font-mono text-2xl">YOUR CONTRIBUTIONS</p>

        {posts && posts.length < 1 ? (
          <div className="mt-10 p-6 bg-white shadow-lg rounded-lg w-full max-w-lg text-center">
            <p className="text-xl font-semibold mb-2">
              You don’t have any content yet 😓
            </p>
            <p className="text-gray-500">
              You can always come back and choose what to upload from all your
              amazing photos. You can come back and upload at any time.
            </p>
            <button
              onClick={() => navigate("/addPost")}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg"
            >
              Get Inspired
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((data) => (
              <div
                key={data._id}
                className="relative flex justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Link
                  to={`/viewPage/${data._id}`}
                  className="block w-full h-full"
                >
                  <img
                    src={data.postImg[0]}
                    alt="Post"
                    className="w-full h-64 object-cover border-4 shadow-xl shadow-[#3E5879] border-[#3E5879] rounded-lg"
                  />
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePost(e, data._id);
                  }}
                  className="absolute bottom-2 right-2 text-white p-2 rounded-full"
                  title="Delete Post"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Scroll-responsive Add Post Button */}
        <Link
          to="/addPost"
          title="Add Post"
          className={`fixed bottom-5 right-5 z-50 group cursor-pointer transition-all duration-300 ${
            showButton ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <svg
            className="stroke-yellow-500 fill-none group-hover:fill-yellow-600 group-active:stroke-white group-active:fill-white group-active:duration-0 duration-300"
            viewBox="0 0 24 24"
            height="50px"
            width="50px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeWidth="1.5"
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            />
            <path strokeWidth="1.5" d="M8 12H16" />
            <path strokeWidth="1.5" d="M12 16V8" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Profile;

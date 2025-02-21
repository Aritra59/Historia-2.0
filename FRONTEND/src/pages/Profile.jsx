import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/userAuth";

function Profile() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const [deleteState, setDeleteState] = useState({});
  // ######################################################################1

  useEffect(() => {
    // Fetch user data
    async function updateData() {
      try {
        const response = await axios.get("https://historia-2-0.onrender.com/users/getUserProfile",{
          withCredentials: true, // Include cookies

        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    updateData();
  }, []);

  // #######################################################################2
  // Get user posts
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://historia-2-0.onrender.com/posts/getUserPosts",{
          withCredentials: true, // Include cookies

        });
        if (response.status !== 200) {
          throw new Error(response);
        }
        console.log(response.data.data);
        setPosts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [deleteState]);

  const logOutMethod = async () => {
    try {
      const logoutStatus = await axios.get("https://historia-2-0.onrender.com/users/logout",{
        withCredentials:true

      });
      if (!logoutStatus) throw new Error("Logout failure");
      dispatcher(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data);

  async function deletePost(e, data) {
    try {
      const deletedPost = await axios.get(`https://historia-2-0.onrender.com/posts/deletePost/${data}`,{
        withCredentials:true
      });
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
          {data.fullname || "Aritra"} {data.admin==true?"(admin)":null}
        </h1>

        <button
          onClick={() => navigate("/profile/edit")}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Edit profile
        </button>
        <button
          onClick={logOutMethod}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>

        <div className="flex mt-4 gap-6 text-lg">
          <div>
            <p>Total Views</p>
            <p>0</p>
          </div>
          <div>
            <p>All-time Rank</p>
            <p>693.6K</p>
          </div>
          <div>
            <p>30-day Rank</p>
            <p>18K</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center">
        <div className="flex gap-6 mb-6">
          <button className="px-4 py-2 bg-black text-white rounded-full">
            Gallery {posts.length}
          </button>
          <button className="px-4 py-2 text-gray-500">Collections</button>
          <button className="px-4 py-2 text-gray-500">Statistics</button>
          {/* <button className="px-4 py-2 text-gray-500">Followers 0</button> */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 shadow-slate-500	 ">
          {posts?.map((data) => (
            <div
              key={data._id}
              className="relative flex justify-center items-center bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Link to={`/viewPage/${data._id}`} className="block w-full h-full">
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
                className="absolute bottom-2 right-2  text-white p-2 rounded-full"
                title="Delete Post"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        )}

        <Link to={"/addPost"}
        className="text-[4rem] text-red-500 
        shadow-black	
        absolute bottom-3 right-1" title="addPost">&#43;</Link>
      </div>
    </div>
  );
}

export default Profile;

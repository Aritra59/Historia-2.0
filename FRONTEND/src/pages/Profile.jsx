import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader.jsx"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {logout } from "../features/userAuth";

function Profile() {
  const [data, setData] = useState(null); 
  const [posts,setPosts] = useState([])
  const navigate = useNavigate()
  const dispatcher = useDispatch()
  useEffect(() => {
    // Fetch user data
    async function updateData() {
      try {
        const response = await axios.get('/users/getUserProfile');

        setData(response.data.data);
        // console.log(response) 
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    updateData(); 
   
  }, []); 


  // get user posts
 useState(()=>{
  (async()=>
  {
    try {
      const response = await axios.get("posts/getUserPosts")
      if(response.status!==200){
          throw new Error(response)
      }
      console.log(response.data.data)
      setPosts(response.data.data)
   
  } catch (error) {
      console.error(error)
  }
  }
)()

 },[])

 const logOutMethod= async ()=>{

  try {
    const logoutStatus= await axios.get("users/logout")
    if(!logoutStatus) throw new Error("logout failure")
      dispatcher(logout())
      navigate("/")

    }
  catch (error) {
        console.error(error)
      } 
    }


  if (!data) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader/>
      </div>
  );
  }

  return (
    <div className="min-h-screen bg-[#F6F2E8] p-6 font-sans text-black">
      <div className="flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full bg-gray-300 flex justify-center items-center text-2xl font-bold">
          <img src={data.avatar} className="bg-cover h-full w-full rounded-full" alt="" />
        </div>
        <h1 className="mt-4 text-3xl font-semibold">{data.fullname || "Aritra"}</h1>
        <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg">Edit profile</button>
        <button 
        onClick={logOutMethod}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg">logout</button>
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

      <div className="mt-10 flex flex-col items-center 	">
        <div className="flex gap-6 mb-6">
          <button className="px-4 py-2 bg-black text-white rounded-full">Gallery 0</button>
          <button className="px-4 py-2 text-gray-500">Collections</button>
          <button className="px-4 py-2 text-gray-500">Statistics</button>
          <button className="px-4 py-2 text-gray-500">Followers 0</button>
          <button className="px-4 py-2 text-gray-500">Following 0</button>
        </div>
        {posts.length < 1 ? (
          <div className="mt-10 p-6 bg-white shadow-lg  rounded-lg w-full max-w-lg text-center">
            <p className="text-xl font-semibold mb-2">You don’t have any content yet 😓</p>
            <p className="text-gray-500">It's ok, we know it's probably hard to choose what to upload from all your amazing photos. You can come back and upload at any time.</p>
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg">Get Inspired</button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 ">
            {posts.map((data) => (
              <div key={data.id} className="h-32 w-32 bg-gray-300 flex justify-center items-center">
                <img src={data.postImg[0]} alt="Post" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader/Loader.jsx"

function Profile() {
  const [data, setData] = useState(null); 
  const [posts,setPosts] = useState({})

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


  if (!data) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loader/>
      </div>
  );
  }


  return (
    <>
<div className="h-[93vh]  text-white w-screen flex  justify-start items-center  bg-[#F6F2E8]">
    <div className=" w-[70%] h-[80%] 
    flex flex-col justify-evenly items-center shadow-2xl mx-12 bg-[#801d0c] rounded-xl

">    

<div className="flex justify-center gap-5 items-center flex-col font-mono">
      <img src={data.avatar} alt="Avatar" loading="lazy" className="h-52 w-52 rounded-[40rem]"/>
      <div className="font-serif text-5xl"> {data.fullname || "john doe"}</div>
</div>

      <ul className="text-xl
       leading-10
       justify-evenly
       w-10/12
       flex
       ">
      <li className="font-serif  ">👦 {data.username || "john doe"}</li>
      <li className="font-serif ">  📍 {data.userLocation||"New York, USA"}</li>
      </ul>


    </div>

      <div>
      {
        posts.map((data)=>(<div key={data.id} className="h-[8.7rem] w-44 bg-[#801d0c] flex m-10 justify-center items-center">
         {
            <img  src={data.postImg[0]} alt="" className="h-24 w-36" />
         }
        </div>))
      }
      </div>

</div>
    </>
  );
}

export default Profile;

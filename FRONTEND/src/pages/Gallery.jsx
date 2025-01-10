import  { useCallback, useEffect, useRef,useState } from 'react';
import axios from "axios"
import { gsap } from 'gsap';

const Gallery = () => {
  const galleryRef = useRef();
  const [response,setResponse] = useState([])
  const [handleOwner,setHandleOwner] = useState("")
  const [likeHandler,setLikehandler] = useState([])
  const [likes,setLikes]= useState([])
  // const [items,setItems] = useState()


  useEffect(() => {

    gsap.fromTo(
      galleryRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
    );
  }, []);

// ###########################################################################
  useEffect(()=>{
    (async()=>{
      try {
        const res = await axios.get("/posts/getLimitedPosts/?count=10") 
        setResponse(res.data.data)
        setHandleOwner(response[0]?.ownerData[0].username || "johnDoe")
      } catch (error) {
        console.error(error)
      }
    })()

  },[])

  useEffect(()=>{  
(async()=>{
  try {
      const likeData= await axios.get(`/posts/fetchLikes`) 
    console.log(likeData.data.data)
    setLikes(likeData.data.data)
  } catch (error) {
    console.error(error)
  }
})()
  },[response])


  async function handleLikes(item){
  
      try {
        console.log(item._id)
        const likeState = await axios.get(`posts/likeSome/${item._id}`)
        console.log(likeState.data.data)
        setLikehandler(likeState?.data?.data)
      } catch (error) {
        console.error(error)
      }

   

  }

  return (
    <div ref={galleryRef} className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {response.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={item.postImg[0]} alt={item.title} className="w-full h-60 object-cover" />
            <div className="p-4 flex justify-between">
              <div className='flex-col'>
              <h3 className="text-lg font-semibold mb-1">{handleOwner || "johnDoe"}</h3>
              <p className="text-gray-500 text-sm mb-1">{item?.postLocation || "NEW YORK,USA"}</p>
              <p className="text-gray-400 text-xs">{item.updatedAt.slice(0,10) || item.createdAt.slice(0,10) || "10-10-1999"}</p>
              </div>

              <div className='flex'>
                <button onClick={()=>handleLikes(item)}>{(likeHandler.includes(item._id) || likes.includes(item._id))?"💗":"🤍"}</button>
                <button></button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
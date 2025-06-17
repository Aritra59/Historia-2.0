import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import axios from "axios"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../loader/Loader";


gsap.registerPlugin(ScrollTrigger);

const RecentBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const cardsRef = useRef([]);
  const [resData,setResData]= useState([])

  // Simulated blog data fetching (replace with real API call)
  useEffect(() => {
    const fetchBlogs = async () => {
     try {
       const response = await axios.get("https://historia-2-0-1.onrender.com/posts/getLimitedPosts/?count=6",{
        withCredentials:true
       })
       setResData(response.data.data)
       console.log(response.data.data)
     } catch (error) {
      console.error(error)
     }
      
    };

    fetchBlogs();
  }, []);

  // GSAP animation effect
  useEffect(() => {
    if (blogs.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".discover-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [blogs]);

  // [
  //   {
  //     id: 1,
  //     title: "Baidyapur Rajbari",
  //     excerpt:
  //       "Baidyapur Rajbari in Purba Bardhaman, West Bengal, is a historic zamindar palace showcasing intricate architecture.",
  //     thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTO8pygbdTXnXG03Nr-iRt0onPhEHSV-1KHg&s",
  //     author: { name: "User1", icon: "https://via.placeholder.com/40" },
  //   },
  //   {
  //     id: 2,
  //     title: "Chandraketugarh, Berachampa",
  //     excerpt:
  //       "Chandraketugarh, near Berachampa, West Bengal, is an ancient archaeological site dating back to the Maurya and Gupta periods.",
  //     thumbnail: "https://i0.wp.com/indianvagabond.com/wp-content/uploads/2021/02/chandraketugarh-17.jpg?ssl=1",
  //     author: { name: "User2", icon: "https://via.placeholder.com/40" },
  //   },
  //   {
  //     id: 3,
  //     title: "Ballav Bari, Dhanyakuria",
  //     excerpt:
  //       "Ballav Bari in Dhanyakuria, West Bengal, is a striking mansion reflecting European architectural influences.",
  //     thumbnail: "https://i0.wp.com/indianvagabond.com/wp-content/uploads/2021/02/dhanyakuria-castle-village-bengal-38.jpg?ssl=1",
  //     author: { name: "User3", icon: "https://via.placeholder.com/40" },
  //   },
  //   {
  //     id: 4,
  //     title: "Rajbari, Dhanyakuria",
  //     excerpt:
  //       "Dhanyakuria Rajbari is an elegant mansion showcasing colonial-inspired architecture and Bengal’s cultural legacy.",
  //     thumbnail: "https://i0.wp.com/traveldreams.live/wp-content/uploads/2021/05/gaines-rajbari-4.jpg?fit=1277%2C852&ssl=1",
  //     author: { name: "User4", icon: "https://via.placeholder.com/40" },
  //   },
  //   {
  //     id: 5,
  //     title: "Khardaha Temples",
  //     excerpt:
  //       "The temples of Khardaha, West Bengal, are revered for their religious significance and exquisite terracotta art.",
  //     thumbnail: "https://www.indiamike.com/files/images/14/43/08/shiva-temples-of-khardah.jpg",
  //     author: { name: "User5", icon: "https://via.placeholder.com/40" },
  //   },
  //   {
  //     id: 6,
  //     title: "Gokulchand Temple",
  //     excerpt:
  //       "This 17th-century terracotta temple, dedicated to Lord Krishna, is the largest laterite stone temple in the region.",
  //     thumbnail: "https://assets.cntraveller.in/photos/61f00cd84d495b4b023dc487/master/w_1600%2Cc_limit/gokulchand%2520temple%2520bishnupur%25203.jpg",
  //     author: { name: "User6", icon: "https://via.placeholder.com/40" },
  //   },
  // ];
  if(resData.length<1) return (<Loader/>)
  return (
    <div className="discover-section bg-customBg py-16 px-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Discover Recent Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resData.map((blog, index) => (
          <div
            key={blog._id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white shadow-lg p-4 rounded transform transition-transform duration-500"
          >
            {/* Profile Header */}
            <div className="flex items-center mb-4">
              <img
                src={blog?.ownerData[0]?.avatar}
                // alt={`${blog?.author.name} icon`}
                className="w-10 h-10 rounded-full mr-3"
              />
              <h4 className="text-md font-semibold">{blog?.ownerData[0]?.username}</h4>
            </div>

            {/* Blog Content */}
            <Link to={`/blogs/${blog.id}`}>
              <img
                src={blog.postImg[0]}
                alt={blog.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600">{blog.content.slice(0,53)+"..."}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlog;

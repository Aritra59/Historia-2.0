import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { Link } from "react-router-dom";

const ViewPage = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { title } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/posts/getPostById/${title}`, {
                    withCredentials: true
                });
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        })();
    }, [title]);

    useEffect(() => {
        axios.get(`/posts/locationBasedPosts/${title}`)
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, [title]);
console.log(posts)
    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="bg-black relative h-[64vh]">
            <div className="min-h-[65vh] flex items-center justify-center relative">
                <img src={data.postImg?.[0]} alt={data.title || "Post Image"} className="absolute inset-0 w-full h-[65vh] object-cover" />
                <div className="absolute inset-0 flex flex-col items-start justify-end text-white z-10 px-6 pb-20">
                    <h1 className="text-5xl font-bold mb-4">{data.title || "Post Title"}</h1>
                    <p className="text-lg max-w-2xl text-start">{data.postLocation || "Location description..."}</p>
                </div>
            </div>

            <div className="min-h-screen bg-white p-8">
                <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">STORIES</h1>
                <div className="max-w-6xl mx-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <img src={data.postImg?.[1]} alt="Story Image" className="w-full h-full object-cover rounded-lg shadow-lg" />
                        <img src={data.postImg?.[2]} alt="Story Image 2" className="w-full h-full object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
                        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{data.content || "Story content here..."}</p>
                    </div>
                </div>
            </div>
            
            <footer className="text-white px-8 pb-8 pt-2 mt-0">
    <h3 className="text-2xl font-semibold mb-4 text-center text-black pb-4">Recommended Posts</h3>
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {posts.data?.length > 0 ? (
            posts.data.map((post) => (
                <Link 
                    to={`/viewPage/${post._id}`} 
                    
                    key={post._id} 
                    className="relative bg-gray-500 h-64 ring-orange-300 ring-8 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:ring-0 "
                >
                    <img 
                        src={post.postImg[0]} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
                        <span className="font-semibold text-lg truncate block">{post.title}</span>
                    </div>
                </Link>
            ))
        ) : (
            <p className="col-span-full text-center text-gray-400">No recommendations available.</p>
        )}
    </div>
</footer>
        </div>
    );
};

export default ViewPage;

import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Loader from "../components/loader/Loader";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon,
} from "react-share";

const ViewPage = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { title } = useParams();
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [submitBtn, setSubmitBtn] = useState(true);
    const [formInput, setFormInput] = useState("");
    const [showCommentForm, setShowCommentForm] = useState(false);
    const currentUrl = window.location.href;

    async function sendComments() {
        try {
            await axios.post(
                `https://historia-2-0-1.onrender.com/comments/addComment`,
                {
                    postId: title,
                    content: formInput,
                },{withCredentials:true},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            setFormInput("");
            setShowCommentForm(false);
            fetchComments();
        } catch (error) {
            console.error("Comment submission error", error);
        }
    }

    const fetchComments = async () => {
        try {
            setLoading(true);
            const commentData = await axios.get(`https://historia-2-0-1.onrender.com/posts/allComments/${title}`, {
                withCredentials: true,
            });
            setComments(commentData.data?.data);
        } catch (error) {
            console.error("Error fetching comments", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`https://historia-2-0-1.onrender.com/posts/getPostById/${title}`, {
                    withCredentials: true,
                });
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [title]);

    useEffect(() => {
        axios
            .get(`https://historia-2-0-1.onrender.com/posts/locationBasedPosts/${title}`,{
                withCredentials:true
            })
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, [title]);

    useEffect(() => {
        fetchComments();
    }, [title]);

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
                <img
                    src={data.postImg?.[0]}
                    alt={data.title || "Post Image"}
                    className="absolute inset-0 w-full h-[65vh] object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end  text-white z-10 px-4 sm:px-6 pb-20 w-full">
                    <h1 className="text-3xl sm:text-5xl font-bold mb-4 break-words max-w-full sm:max-w-3xl">
                        {data.title || "Post Title"}
                    </h1>
                    <p className="text-base sm:text-lg max-w-full sm:max-w-2xl text-start break-words">
                        {data.postLocation || "Location description..."}
                    </p>
                    <div className="mt-4">
                        <StyledWrapper>
                            <div className="card">
                                <div className="socialContainer containerOne">
                                    <FacebookShareButton url={currentUrl} title={`Have a visual glimpse about ${data.title} and its hidden treasures`}>

                                        <FacebookIcon size={36} round />
                                    </FacebookShareButton>
                                </div>
                                <div className="socialContainer containerTwo">
                                    <TwitterShareButton url={currentUrl} title={`Have a visual glimpse about ${data.title} and its hidden treasures`}>
                                        <TwitterIcon size={36} round />
                                    </TwitterShareButton>
                                </div>
                                <div className="socialContainer containerThree">
                                    <LinkedinShareButton url={currentUrl} title={`Have a visual glimpse about ${data.title} and its hidden treasures`}>
                                        <LinkedinIcon size={36} round />
                                    </LinkedinShareButton>
                                </div>
                                <div className="socialContainer containerFour">
                                    <WhatsappShareButton url={currentUrl} title={`Have a visual glimpse about ${data.title} and its hidden treasures`}>
                                        <WhatsappIcon size={36} round />
                                    </WhatsappShareButton>
                                </div>
                            </div>
                        </StyledWrapper>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-white p-8">
                <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">STORIES</h1>
                <div className="max-w-6xl mx-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <img
                            src={data.postImg?.[1]}
                            alt="Story Image"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                        <img
                            src={data.postImg?.[2]}
                            alt="Story Image 2"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
                        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                            {data.content || "Story content here..."}
                        </p>
                    </div>
                </div>
            </div>

            {/* <h1 className="text-2xl mx-10 mb-6 text-center font-semibold">Comments</h1> */}

            <section className="px-6 md:px-20 py-10 bg-gray-50">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Comments</h1>

                <div className="space-y-6 max-w-3xl mx-auto">
                    {comments && comments.length > 0 ? (
                        comments.map((data) => (
                            <div key={data?._id} className="bg-white rounded-xl shadow-md p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <img src={data.userData[0].avatar} alt="avatar" className="h-10 w-10 rounded-full border" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{data.userData[0].username}</p>
                                        <span className="text-sm text-gray-400">Posted just now</span>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-lg">{data.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-xl text-gray-500">No comments found</p>
                    )}

                    {!showCommentForm && (
                        <div className="text-right">
                            <button
                                disabled={!submitBtn}
                                onClick={() => setShowCommentForm(true)}
                                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Add a Comment
                            </button>
                        </div>
                    )}

                    {showCommentForm && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendComments();
                            }}
                            className="bg-white rounded-lg shadow p-6"
                        >
                            <textarea
                                placeholder="Write your comment..."
                                className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-400 focus:outline-none resize-none"
                                rows={4}
                                required
                                value={formInput}
                                onChange={(e) => setFormInput(e.target.value)}
                            />
                            <div className="mt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormInput("");
                                        setShowCommentForm(false);
                                    }}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            <footer className="text-white px-8 pb-8 pt-2 mt-0">
                <h3 className="text-2xl font-semibold mb-4 text-center text-black pb-4">Recommended Posts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {posts.data?.length > 0 ? (
                        posts.data.map((post) => (
                            <Link
                                to={`/viewPage/${post._id}`}
                                key={post._id}
                                className="relative bg-gray-500 h-64 ring-orange-300 ring-8 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:ring-0"
                            >
                                <img src={post.postImg[0]} alt={post.title} className="w-full h-full object-cover" />
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
// This is for social media part
const StyledWrapper = styled.div`
  .card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    
  }

  .socialContainer {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    border-radius: 50%;
    
  }

  .socialContainer:hover {
    transform: scale(1.2);
  }

  .socialContainer:active {
    transform: scale(0.9);
  }
`;

export default ViewPage;

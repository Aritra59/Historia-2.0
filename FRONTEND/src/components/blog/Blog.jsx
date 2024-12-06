import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../blog/img/xd.jpg";


const Blog = () => {

    return (
        <div className="container mx-auto p-4 mt-6 max-w-full mb-12">
            <div
                className="relative overflow-hidden bg-cover bg-center text-white h-[25vh] md:h-[35vh] lg:h-[45vh] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                style={{
                    backgroundImage: `url(${img1})`, height: "220px "
                }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 flex sm:flex justify-center items-center"></div>

                <div className="relative flex flex-col md:flex-row items-center justify-center h-full px-6 md:px-12 lg:px-16  md:justify-between">



                    <div className="flex flex-col items-center md:items-start space-y-4 max-w-lg text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                            Share Your Local Area Stories
                        </h2>

                        <p className="text-xs sm:text-sm md:text-base">
                            Do you have a fascinating story about a historical place in your local
                            area? Share it with us and let others discover the hidden gems of your
                            community.
                        </p>
                    </div>



                    <div className="mt-4 md:mt-0">
                        <Link to="/">
                            <button className="bg-red-800 hover:bg-red-700 text-white px-5 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold shadow-md transition-all">
                                Share Your Story
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Blog

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Victoria from "./video/Victoria.mp4";


const VideoSection = () => {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsInView(entry.isIntersecting);
                });
            },
            { threshold: 0.5 }
        );

        const videoSection = document.querySelector('.video-section');
        if (videoSection) observer.observe(videoSection);

        return () => {
            if (videoSection) observer.unobserve(videoSection);
        };
    }, []);

    return (
        <section className="video-section mt-12">
            <div className="video-container relative">
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                    className="absolute inset-0 flex flex-col items-start justify-center z-20 px-8"
                    
                >
                    <TypeAnimation
                        sequence={[
                            "EXPLORE THE UNKNOWN",
                            1000,
                            "EXPLORE THE HISTORY",
                            1000,

                            "TOGETHER WE PROTECT OUR CULTURAL GLORY",
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{
                            fontSize: "4em", // Increase font size
                            color: "white",
                            textAlign: "center", // Text alignment
                            lineHeight: "1.2",  // Reduce line spacing
                        }}
                        repeat={Infinity}
                    />
                </motion.div>

                {/* Video Background */}
                <video
                    className="video-player w-full h-screen object-cover"
                    src={Victoria}
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>
            </div>
        </section>
    );
};

export default VideoSection;
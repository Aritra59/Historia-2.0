import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Loader from "../components/loader/Loader";

const ViewPage = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { title } = useParams();

    // Fetch data from API
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/posts/getPostById/${title}`); // Replace with your API endpoint
                setData(response.data.data);
                setLoading(false);
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        })();
    }, [title]);

    if (loading) {
        <div className="h-screen w-screen flex justify-center items-center">
        <Loader />
      </div>
    }

    // Function to process "howToReachContent" and render it as <ul> and <li>
    const renderHowToReach = (text) => {
        if (!text) return null; // Handle case where the text is undefined or empty

        const travelMethods = ["By Car", "By Train", "By Bus"];
        const listItems = [];

        travelMethods.forEach((method) => {
            const startIndex = text.indexOf(method);
            if (startIndex !== -1) {
                let endIndex = text.indexOf("By ", startIndex + method.length);
                if (endIndex === -1) endIndex = text.length;

                // Extract the method-specific text
                const travelText = text.slice(startIndex + method.length, endIndex).trim();

                // Split into sentences and create <li> elements
                const sentences = travelText
                    .split(".")
                    .map((sentence) => sentence.trim())
                    .filter((sentence) => sentence.length > 0); // Remove empty sentences

                listItems.push(
                    <div key={method}>
                        <h3 className="font-bold text-xl mb-2">{method}:</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            {sentences.map((sentence, index) => (
                                <li key={index}>{sentence}.</li>
                            ))}
                        </ul>
                    </div>
                );
            }
        });

        return listItems;
    };

    return (
        <div className="bg-black relative h-[64vh]">
            <div className="min-h-screen flex items-center justify-center relative">
                <img
                    src={data.postImg?.[1]}
                    alt="Gayen Baganbari"
                    className="absolute inset-0 w-full h-[91vh] object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end text-white z-10 px-6 pb-20">
                    <h1 className="text-5xl font-bold mb-4">
                        {data.title || "GAYEN BAGANBARI (1742)"}
                    </h1>
                    <p className="text-lg max-w-2xl text-start">
                        {data.content ||
                            "Dhanyakuria's architectural marvel, combining European and Indian design elements, stands as a testament to historical grandeur and beauty."}
                    </p>
                </div>
            </div>

            <div className="min-h-screen bg-cover bg-center p-8 bg-white">
                <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
                    STORIES
                </h1>
                <div className="max-w-6xl mx-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img
                                src={data.postImg?.[0]}
                                alt="The Majestic Gateway"
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                            <p className="text-center text-sm italic py-2 text-gray-700">
                                The Majestic Gateway to Gayen Baganbari
                            </p>
                        </div>
                        <div>
                            <img
                                src={data.postImg?.[0]}
                                alt="The Heroic Sculpture"
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                            <p className="text-center text-sm italic py-2 text-gray-700">
                                The Heroic Sculpture of Dhanyakuria
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {data.content ||
                                "The sculpture of two men fighting with a lion at Dhanyakuria, located in the Gayen Baganbari estate, is a remarkable depiction of bravery and strength. The craftsmanship captures intricate details and evokes emotions as one observes the story unfold."}
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mt-4">
                            The grand entrance gate of Gayen Baganbari in Dhanyakuria is a striking architectural feature that immediately
                            catches any visitor’s eye. This large structure stands as a testament to the opulence and artistic sensibilities of
                            the era.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mt-4">
                            The gate is heavily inspired by European architectural styles. Flanked by sculptures of lions and adorned with ornate
                            carvings, it showcases a blend of cultural motifs. The gate represents the fusion of colonial influences with local
                            design sensibilities.
                        </p>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
                    <h1 className="text-center text-4xl font-bold text-brown mb-6">LOCATION</h1>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-2/3 text-lg text-brown space-y-6">

                            {renderHowToReach(data.howToReachContent) || "if no information available.Refer GMAPS"}
                            <p>If no information available.Refer GMAPS</p>
                        </div>
                        <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
                            <img
                                // src={compass}
                                alt="Compass"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPage;

import  { useState, useEffect } from "react";
import { useParams } from "react-router"
import axios from "axios";

const ViewPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {title} = useParams()
  // Fetch data from API
  useEffect(() => {
(async () => {
      try {
        const response = await axios.get(`/posts/getPostById/${title}`); // Replace with your API endpoint

        setData(response.data.data);
        setLoading(false);
        console.log(response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    })()

  
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // if (!data) {
  //   return <div className="min-h-screen flex items-center justify-center">No data available</div>;
  // }

  return (
    <div className="min-h-screen bg-black relative">
            <div className="min-h-screen flex items-center justify-center relative">
                <img
                    src={data.postImg[1]}
                    alt="Gayen Baganbari"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end text-white z-10 left-6 bottom-10">
                    <h1 className="text-5xl font-bold mb-4">{data.title || "GAYEN BAGANBARI (1742)"}</h1>
                    <p className="text-lg max-w-2xl text-start">
                        {data.content || ("Dhanyakuria's architectural marvel, combining European and Indian design elements, stands as a testament to historical grandeur and beauty.")}
                    </p>
                </div>
            </div>

            <div
                className="min-h-screen bg-cover bg-center p-8 bg-white "
                style={{
                    // backgroundImage: `url(${ParchmentBg})`,
                    backgroundSize: 'cover',
                }}
            >

                <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
                    STORIES
                </h1>


                <div className="max-w-6xl mx-auto grid gap-8 p-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        
                        <div>
                            <img
                                src={data.postImg[0]}
                                alt="The Majestic Gateway"
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                            <p className="text-center text-sm italic py-2 text-gray-700">
                                The Majestic Gateway to Gayen Baganbari
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {data.content || ("The sculpture of two men fighting with a lion at Dhanyakuria, located in the Gayen Baganbari estate, is a remarkable depiction of bravery and strength. The craftsmanship captures intricate details and evokes emotions as one observes the story unfold.")}
                            </p>
                           
                        </div>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    
                        <div>
                            <img
                                src={data.postImg[0]}
                                alt="The Heroic Sculpture"
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                            <p className="text-center text-sm italic py-2 text-gray-700">
                                The Heroic Sculpture of Dhanyakuria
                            </p>
                        </div>
                        
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                The grand entrance gate of Gayen Baganbari in Dhanyakuria is a striking
                                architectural feature that immediately catches any visitor’s eye. This
                                large structure stands as a testament to the opulence and artistic
                                sensibilities of the era.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                The gate is heavily inspired by European architectural styles. Flanked
                                by sculptures of lions and adorned with ornate carvings, it showcases a
                                blend of cultural motifs. The gate represents the fusion of colonial
                                influences with local design sensibilities.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="bg-beige p-8 max-w-5xl mx-auto rounded-lg shadow-lg border-2 border-amber-300">
                    <h1 className="text-center text-4xl font-bold text-brown mb-6">LOCATION</h1>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        
                        <div className="md:w-2/3 text-lg text-brown space-y-6">
                            <div>
                                <h3 className="font-bold text-xl mb-2">By Car:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Start on VIP Road or EM Bypass, heading towards Barasat.</li>
                                    <li>Take Taki Road (SH 2) from Barasat.</li>
                                    <li>Drive straight for approximately 35-40 km.</li>
                                    <li>
                                        Dhanyakuria village will be on your route, and Gayen Baganbari is
                                        located near the Berachampa crossing.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-xl mb-2">By Train:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Take a train from Sealdah Station towards Hasnabad.</li>
                                    <li>Get off at Guma or Basirhat station.</li>
                                    <li>From there, hire a local auto or cab to Dhanyakuria.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-xl mb-2">By Bus:</h3>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Take a bus heading towards Taki or Basirhat from Kolkata.</li>
                                    <li>Ask to get off at Dhanyakuria or Berachampa.</li>
                                    <li>
                                        From the stop, you can hire a rickshaw or walk to Gayen Baganbari.
                                    </li>
                                </ul>
                            </div>
                        </div>
{/* Compasss */}
                        <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center">
                            <img
                                // src={compass}
                                alt="Compass"
                                className="rounded-lg "
                            />
                        </div>
                    </div>
                </div>
            </div>


        </div>
  );
};

export default ViewPage;

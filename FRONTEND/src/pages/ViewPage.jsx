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
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">{data.title ||"null"}</h1>
        </div>
      </header>

      {/* Banner */}
      <div className="relative">
        <img
          src={data.postImg[1]}
          alt="Banner"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute bottom-5 left-5 text-white">
          <h2 className="text-4xl font-bold">{data.name ||"john"}</h2>
          <p className="text-lg">{data.location}</p>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stories Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
              <div  className="bg-white p-6 rounded-lg shadow">
                <img
                  src={data.postImg[0]}
                  alt={data.title || "john"}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
                <p className="text-gray-600">{data.content}</p>
              </div>
          
          </div>
        </section>

        {/* Location Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">{data.postLocation ||"NY"}</p>
            <ul className="mt-4 list-disc list-inside">
              {/* {data.directions.map((direction, index) => (
                <li key={index}>{direction}</li>
              ))} */}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ViewPage;

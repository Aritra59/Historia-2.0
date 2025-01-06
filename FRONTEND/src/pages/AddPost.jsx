import { useState } from 'react'
import axios from 'axios'
import Loader from '../components/loader/Loader'
import { useNavigate } from 'react-router-dom'

function AddPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [location, setLocation] = useState("")
    const [files, setFile] = useState([])
    // const [response, setResponse] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare FormData
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("postLocation", location);

        for (let i = 0; i < files.length; i++) {
            formData.append("postImg", files[i]);
        }

        // Send data to the server
        try {
            setLoading(true)
            const response = await axios.post("posts/addPost", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // setResponse(response.data.data)
            setLoading(false)
            // console.log("Response:", response.data.data);
            navigate("/")
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    if (loading) {
        return (<div className="h-screen w-screen flex justify-center items-center">
            <Loader />
        </div>)
    }

    return (
        <>
            <div className='h-[90vh] w-[90vw]'>

                <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
                    <h1 className="text-2xl font-bold mb-6">Submit Your Details</h1>
                    <form action="/submit" method="POST" encType="multipart/form-data"
                        onSubmit={(e) => {
                            handleSubmit(e)
                        }}
                        className="space-y-6">


                        <div>
                            <label className="block text-sm font-medium text-gray-700 "></label>
                            <input type="text" id="title"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                placeholder="Title"
                                name="title" className="mt-1 block w-full
                            h-14  bg-[#374151]
                            rounded-md shadow-sm focus:ring-blue-500
                            text-xl focus:border-blue-500" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700"></label>
                            <textarea id="content"
                                onChange={e => setContent(e.target.value)}
                                value={content}
                                placeholder="Enter Content here..."
                                name="content" rows="4" className="mt-1
                            text-xl bg-[#374151]
                            block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700"></label>
                            <input type="text" id="location" name="location"
                                onChange={e => setLocation(e.target.value)}
                                value={location}
                                placeholder="Location"
                                className="mt-1 block w-full text-xl bg-[#374151] h-14
                            border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 h"></label>
                            <input type="file"
                                onChange={(e) => {
                                    let imgFiles = e.target?.files
                                    setFile([...imgFiles])
                                }}
                                id="files" name="files" className="mt-1 block w-full text-white h-14 rounded-md bg-[#374151]
                            focus:ring-blue-500 focus:border-blue-500" multiple />
                        </div>


                        <div>
                            <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-700
                         text-white py-2 px-4 rounded-md shadow-sm">Submit</button>
                        </div>
                    </form>
                </div>


            </div>
        </>
    )
}

export default AddPost
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/loader/Loader.jsx";
import axios from "axios";
import { signUp } from "../features/userAuth.js";
import { useNavigate } from "react-router-dom"

const EditProfile = () => {

    const selector = useSelector(state => state.auth.authState);
    const dispatcher = useDispatch();

    let [email, setEmail] = useState("");
    let [username, setUsername] = useState("");
    let [fullName, setFullName] = useState("");
    let [avatar, setAvatar] = useState(null)
    let [location, setLocation] = useState("")
    // let [responses,setResponses] = useState({})
    let navigator = useNavigate()

    const handleSubmit = async function (e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("fullname", fullName);
            formData.append("avatar", avatar);
            formData.append("userLocation", location);

            const response = await axios.patch("/users/editUser/", formData);
            // setResponse(response.data.data)
            dispatcher(signUp(response.data))
            await axios.get(`users/sendCookies/${response.data?.data?._id}`)

            console.log(response.data.data);

            navigator("/")

        } catch (error) {

            console.error("Error during sign-up:", error);
        }


    };

    if (!selector?.isUserLoggedIn) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Edit Profile
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            // value={formData.username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            // value={formData.fullName}
                            onChange={e => setFullName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter full name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            // value={formData.email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="userLocation" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            id="userLocation"
                            name="userLocation"
                            // value={formData.userLocation}
                            onChange={e => setLocation(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter location"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="userLocation" className="block text-sm font-medium text-gray-700">
                            avatar
                        </label>
                        <input
                            type="file"
                            id="userLocation"
                            name="userLocation"
                            // value={formData.userLocation}
                            onChange={e => setAvatar(e.target.files[0])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter location"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;

import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [data, setData] = useState(null); // Default to null to handle loading state

  useEffect(() => {
    // Fetch user data
    async function updateData() {
      try {
        const response = await axios.get('/users/getUserProfile');
        console.log(response.data.data); // Log the response data

        setData(response.data.data); // Store the user data in state
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    updateData(); 
  }, []); 

  // Render loading state while data is being fetched
  if (!data) {
    return <div>Loading...</div>;
  }

  // Render the user data when available
  return (
    <div>
      <div>{data.username}</div>
      <div>{data.fullname}</div>
      {/* You can include the avatar image as well */}
      <img src={data.avatar} alt="Avatar" loading="lazy" />
    </div>
  );
}

export default Profile;

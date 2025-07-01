import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';
import Error404 from "../pages/Error404.jsx";

function AdminPostControl() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(0);
  const userState = useSelector((state) => state.auth.authState.userData);

  useEffect(() => {
    (async () => {
      try {
        const AllPosts = await axios.get('https://historia-2-0-1.onrender.com/posts/allPosts/?pageNo=1',{
          withCredentials:true
        });
        setUsers(AllPosts.data.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    })();
  }, [reload]);

  function changeRoles(id) {
    (async () => {
      try {
        await axios.get(`https://historia-2-0-1.onrender.com/posts/deletePost/${id}`,{
          withCredentials:true
        });
        setReload((prev) => prev + 1);
      } catch (err) {
        console.error("Error deleting post", err);
      }
    })();
  }

  if (userState?.data?.admin === false || userState?.data?.admin == null) {
    return <Error404 />;
  }

  if (!users) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-gray-100 p-4 border-b md:border-b-0 md:border-r">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <nav className="flex md:flex-col gap-4">
          <NavLink to="/admin/dashboard/posts" className="p-2  bg-red-100 rounded hover:bg-red-300 ">Posts</NavLink>
          <NavLink to="/admin/dashboard/users" className="p-2  bg-red-100 rounded hover:bg-red-300 ">Users</NavLink>
          <NavLink to="/admin/dashboard/events" className="p-2  bg-red-100 rounded hover:bg-red-300 ">Events</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <h1 className='text-xl font-bold mb-4'>POSTS</h1>

        <div className="border rounded-lg overflow-auto max-h-[75vh]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Index</th>
                <th className="p-2">Post Image</th>
                <th className="p-2">Email</th>
                <th className="p-2">Posted By</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex flex-wrap gap-2">
                    {user.postImg.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`post-${i}`}
                        className="h-20 w-20 object-cover rounded"
                      />
                    ))}
                  </td>
                  <td className="p-2 break-words">{user.userData[0]?.email || "unknown@example.com"}</td>
                  <td className="p-2">{user.userData[0]?.username || "johnDoe"}</td>
                  <td className="p-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => changeRoles(user._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPostControl;

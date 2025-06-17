import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import Loader from '../components/loader/Loader';
import Error404 from "../pages/Error404.jsx";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('Active Users');
  const [reload, setReload] = useState(0);
  const userState = useSelector(state => state.auth.authState.userData);

  useEffect(() => {
    (async () => {
      try {
        const UserResponse = await axios.get('https://historia-2-0-1.onrender.com/users/getAllUsers',{
          withCredentials:true
        });
        const AdminUsers = await axios.get('https://historia-2-0-1.onrender.com/users/getAllAdmins',{
          withCredentials:true
        });
        setUsers(filter === "Active Users" ? UserResponse.data.data : AdminUsers.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, [filter, reload]);

  async function changeRoles(id) {
    try {
      const response = await axios.delete(`https://historia-2-0-1.onrender.com/users/deleteUser/${id}`,{withCredentials:true});
      if (response.data.data?.result === "ok") {
        setReload(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  async function TogglePermission(id) {
    try {
      const response = await axios.get(`https://historia-2-0-1.onrender.com/users/toggleAdmin/${id}`,{withCredentials:true});
      if (response.data.data?.result === "ok") {
        setReload(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error toggling permission:", error);
    }
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <select
            className="border p-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>Active Users</option>
            <option>Admin Users</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="border rounded-lg overflow-auto max-h-[75vh]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Index</th>
                <th className="p-2">User</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
                <th className="p-2">Promote</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2 break-words">{user.email}</td>
                  <td className="p-2">{user.admin ? 'Admin' : 'User'}</td>
                  <td className="p-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => changeRoles(user._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => TogglePermission(user._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Promote
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

export default AdminDashboard;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {useSelector} from "react-redux"
import Loader from '../components/loader/Loader';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('Active Users');
  const [reload,setReload]= useState(0)
  const userState = useSelector(state=>state.auth.authState.userData)

  

  useEffect(() => {
    (async () => {
      const UserResponse = await axios.get('/users/getAllUsers');
      const AdminUsers = await axios.get('/users/getAllAdmins')

      console.log(UserResponse)
      setUsers(filter=="Active Users" ?UserResponse.data.data:AdminUsers.data.data);
    })();
  }, [filter,reload]);

   function changeRoles(data) {
   ( async()=>{
      const clickResponse = await axios.delete(`/users/deleteUser/${data}`)
      if(clickResponse.data.data?.result=="ok") setReload((prev)=>prev+1)

    })()
  }
   function TogglePermission(data) {
   ( async()=>{
      const clickResponse = await axios.get(`/users/toggleAdmin/${data}`)
      if(clickResponse.data.data?.result=="ok") setReload((prev)=>prev+1)

    })()
  }
console.log(userState)
  if(userState?.data.admin==false||null){
    return (
      <Loader/>
    )
  }
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Setup</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="#" className="p-2 hover:bg-red-200">Posts</NavLink>
          <NavLink to="/admin/dashboard" className="p-2 hover:bg-red-200">Users</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <div>
            <select 
              className="border p-2" 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>Active Users</option>
            
              <option>Admin Users</option>
            </select>
          </div>
          <div>
          
          </div>
        </div>

        {/* Users Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
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
              {users.map((user,index) => (
                <tr key={user._id} className="border-t">
                  <td className='p-2'>{index}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.admin ? 'Admin' : 'User'}</td>
                  <td className="p-2">
                    <button className="text-red-600" onClick={(e)=>changeRoles(user._id)}>&#x1F5D1; Delete</button>
                  </td>
                  <td className='p-2 '><input type="button"  
                  onClick={e=>TogglePermission(user._id)}
                  className="bg-green-500 text-white px-4  rounded mr-2 text-xl" value={"+"}/></td>
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



// async function deletePost(e, data) {
  //   try {
  //     const deletedPost = await axios.get(`posts/deletePost/${data}`);
  //     setDeleteState(deletedPost.data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
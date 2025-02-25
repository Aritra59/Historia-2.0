import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';
import Error404 from "../pages/Error404.jsx"

function AdminPostControl() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('Active Users');
  const [reload, setReload] = useState(0);
  const userState = useSelector((state) => state.auth.authState.userData);

  useEffect(() => {
    (async () => {
      const AllPosts = await axios.get('/posts/allPosts/?pageNo=1');
      setUsers(AllPosts.data.data);
    })();
  }, [filter, reload]);

  function changeRoles(data) {
    ( async()=>{
       const clickResponse = await axios.get(`/posts/deletePost/${data}`)
       
        setReload((prev)=>prev+1)
 
     })()
    }
console.log(userState)
// Loader
  if (userState?.data.admin === false || userState?.data.admin == null) {
    return <Error404 />;
  }
  if(!users) return (
    <Loader/>
  )

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Setup</h2>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/dashboard/posts" className="p-2 hover:bg-red-200">Posts</NavLink>
          <NavLink to="/admin/dashboard/users" className="p-2 hover:bg-red-200">Users</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
          <div>
           
          </div>
          <div></div>
        </div>

        {/* Users Table */}
        <h1 className='text-xl my-3 font-bold'>POSTS</h1>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Index</th>
                <th className="p-2">User</th>
                <th className="p-2">Email</th>
                <th className="p-2">Posted By</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2">{index}</td>
                  <td className="p-2 flex gap-2">
                    {user.postImg.map((img, i) => (
                      <img 
                        key={i} 
                        src={img || null} 
                        alt={`post-${i}`} 
                        className="h-20 w-auto object-cover rounded-md"
                      />
                    ))}
                  </td>
                  <td className="p-2">{user.userData[0]?.email || "bajex27675@btcours.com"}</td>
                  <td className="p-2">{user.userData[0]?.username || "johnDoe"}</td>
                  <td className="p-2">
                    <button className="text-red-600" onClick={() => changeRoles(user._id)}>
                      &#x1F5D1; Delete
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

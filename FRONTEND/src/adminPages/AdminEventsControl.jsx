// ✅ RESPONSIVE AdminEventsControl.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';
import Error404 from "../pages/Error404.jsx";

function AdminEventsControl() {
  const [events, setEvents] = useState([]);
  const [reload, setReload] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    eventLocation: '',
    timing: '',
    dateOfEvent: '',
    eventDetails: '',
    eventImage: null,
  });

  const userState = useSelector((state) => state.auth.authState.userData);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/events/fetchAllEvent');
        setEvents(res.data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    })();
  }, [reload]);

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/events/deleteEventWithId/${id}`);
      setReload((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }

      await axios.post('/events/createEvent', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setOpenForm(false);
      setReload((prev) => prev + 1);
      setFormData({
        title: '',
        eventLocation: '',
        timing: '',
        dateOfEvent: '',
        eventDetails: '',
        eventImage: null,
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  if (userState?.data?.admin === false || userState?.data?.admin == null) {
    return <Error404 />;
  }

  if (!events) return <Loader />;

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-gray-100 p-4 border-b md:border-b-0 md:border-r">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <nav className="flex flex-row md:flex-col gap-4">
          <NavLink to="/admin/dashboard/posts" className="p-2 bg-red-100 rounded hover:bg-red-300">Posts</NavLink>
          <NavLink to="/admin/dashboard/users" className="p-2 bg-red-100 rounded hover:bg-red-300">Users</NavLink>
          <NavLink to="/admin/dashboard/events" className="p-2 bg-red-100 rounded hover:bg-red-300">Events</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-y-auto items">
        <div className="flex flex-col  md:flex-row justify-between items-center mb-4 gap-4  pr-5">
          <h1 className="text-xl font-bold">All Events</h1>
          <button
            onClick={() => setOpenForm(true)}
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 "
          >
            + Add Event
          </button>
        </div>

        {/* Events Table */}
        <div className="overflow-auto border rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Title</th>
                <th className="p-2">Location</th>
                <th className="p-2">Timing</th>
                <th className="p-2">Date</th>
                <th className="p-2">Image</th>
                <th className="p-2">Details</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{event.title}</td>
                  <td className="p-2">{event.eventLocation}</td>
                  <td className="p-2 text-pink-700">{event.timing}</td>
                  <td className="p-2">{event.dateOfEvent}</td>
                  <td className="p-2">
                    <img
                      src={event.eventImage || "/placeholder.png"}
                      alt="event"
                      className="w-20 h-auto rounded"
                    />
                  </td>
                  <td className="p-2 max-w-[200px] truncate">{event.eventDetails}</td>
                  <td className="p-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => deleteEvent(event._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dialog Box Form */}
        {openForm && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
              <button
                onClick={() => setOpenForm(false)}
                className="absolute top-2 right-3 text-lg text-red-600"
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-4">Add New Event</h2>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleFormChange} className="border p-2 rounded" required />
                <input type="text" name="eventLocation" placeholder="Location" value={formData.eventLocation} onChange={handleFormChange} className="border p-2 rounded" required />
                <input type="text" name="timing" placeholder="Timing" value={formData.timing} onChange={handleFormChange} className="border p-2 rounded" required />
                <input type="date" name="dateOfEvent" value={formData.dateOfEvent} onChange={handleFormChange} className="border p-2 rounded" required />
                <textarea name="eventDetails" placeholder="Details" value={formData.eventDetails} onChange={handleFormChange} className="border p-2 rounded" required />
                <input type="file" name="eventImage" onChange={handleFormChange} className="border p-2 rounded" accept="image/*" required />
                <button type="submit" className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">POST EVENT</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEventsControl;

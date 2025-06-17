import { useEffect, useState } from "react";
import EventBg from "../components/category/events/Bg-Events.png";
import Clock from "../components/category/events/clock.png";
import Location from "../components/category/events/location.png";
import Bookmark from "../components/category/events/agenda.png";
import { motion } from "framer-motion";
import axios from "axios";

const Event = () => {
  const [data, setData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/events/fetchAllEvent/");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    })();
  }, []);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[90vh]">
        <img
          src={EventBg}
          alt="Event Background"
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center md:items-start text-center md:text-left text-white px-4 md:px-10 lg:px-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="mb-24 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              EVENTS
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl w-full sm:w-[90%] md:w-[80%] lg:w-[70%]">
              Stay updated with what’s next! Explore upcoming events, highlights, and stories that keep you informed and inspired.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedEvent.eventImage}
              alt="Event"
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Date:</strong> {selectedEvent.dateOfEvent}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Time:</strong> {selectedEvent.timing}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Location:</strong> {selectedEvent.eventLocation}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Access:</strong>{" "}
              {selectedEvent.membership ? "Members Only" : "Everyone is Allowed"}
            </p>
            <p className="text-gray-800 mt-4">{selectedEvent.eventDetails}</p>
          </div>
        </div>
      )}

      {/* Event Cards */}
      <div className="flex flex-col items-center p-6 space-y-6 w-full">
        {data.map((event, index) => (
          <motion.div
            key={event._id}
            className="w-full max-w-6xl bg-white rounded-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.3 }}
            viewport={{ once: false, margin: "-50px" }}
          >
            <div className="flex flex-wrap lg:flex-nowrap border-b-2 pb-8 justify-between items-center w-full space-y-6 lg:space-y-0">
              {/* Event Date */}
              <div className="flex items-center space-x-4 pr-4 border-r-2">
                <div className="bg-white shadow-xl rounded-[2rem] p-6 flex flex-col items-center justify-center w-[13rem] max-w-[12rem] md:max-w-[16rem] lg:max-w-[18rem] relative">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-red-500">
                    {new Date(event.dateOfEvent).getDate()}
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-500">
                    {new Date(event.dateOfEvent).toLocaleString("en-US", {
                      month: "short",
                    }).toUpperCase()}
                  </p>
                  <p className="text-sm md:text-lg lg:text-xl text-gray-400 absolute right-3 bottom-2">
                    {new Date(event.dateOfEvent).getFullYear()}
                  </p>
                </div>

                {/* Event Title and Button */}
                <div className="w-full max-w-[90%] lg:max-w-[40rem] mx-auto">
                  <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-center lg:text-left">
                    {event.title}
                  </h2>
                  <div className="mt-4 flex justify-center lg:justify-start">
                    <button
                      onClick={() => handleOpenModal(event)}
                      className="bg-black text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-lg rounded"
                    >
                      Event Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Details Summary */}
              <div className="flex flex-col items-start pl-6 space-y-4 w-full lg:w-auto">
                <div className="flex items-center space-x-4">
                  <img
                    src={Clock}
                    alt="Clock Icon"
                    className="w-5 h-5 md:w-8 md:h-8"
                  />
                  <p className="text-sm md:text-lg font-medium">
                    {event.timing}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={Location}
                    alt="Location Icon"
                    className="w-5 h-5 md:w-8 md:h-8"
                  />
                  <p className="text-sm md:text-lg font-medium">
                    {event.eventLocation}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    src={Bookmark}
                    alt="Bookmark Icon"
                    className="w-5 h-5 md:w-8 md:h-8"
                  />
                  <p className="text-sm md:text-lg font-medium w-full lg:w-[20rem]">
                    {event.membership
                      ? "Only Members are Invited"
                      : "Everyone is Allowed"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Event;

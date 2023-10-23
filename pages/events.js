// pages/events.js
import Link from 'next/link';
import { Btn, Header } from "../components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import RoundLoader from '../components/utils/RoundLoader';

const Events = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // destructuring props
  const { user, roles, ROLES } = props;

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const response = await axios.get("/api/GET/events"); // Adjust the endpoint
        setEvents(response.data); // Assuming the API returns an array of blogs
      } catch (error) {
        console.error("Error fetching Events:", error);
      }
      setLoading(false);
    }
    
    fetchEvents();
  }, []);

  // registering a event
  const registerEvent = (id, participants) => {
    if (user.username) {
      const modifiedEvents = events.map(obj => {
        if (obj.id === id) {
            return { ...obj, participants: [...participants, user.username] };
        }
        return obj;

      });
      setEvents(modifiedEvents);
      fetch("/api/POST/register-event", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          participants: [...participants, user.username],
        }),
      });
      toast.success("Registered Successfully");
    } else {
      toast.success("Please Sign-In");
    }
  };

  return (
    <div className="w-full h-full bg-image">
    <Header {...props} />
    <section className="py-12 px-5 sm:px-10 md:px-24 lg:px-32 flex flex-col items-center">
      <h1 className="text-white text-5xl font-bold mb-8">Upcoming Events</h1>
      {loading 
      ? <RoundLoader />
      : <>
        <div className="text-white container mx-auto py-8">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Event Name</th>
                <th className="border border-gray-300 px-4 py-2">Event URL</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Venue</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Resource</th>
                <th className="border border-gray-300 px-4 py-2">To Register</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`/event/${event.id}`}>
                      <a>{event.event_name}</a>
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a
                      href={event.event_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {event.event_url}
                    </a>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{event.event_description}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.event_venue}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.event_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.event_time}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.event_resources}</td>
                  <td className={`border border-gray-300 px-4 py-2 ${event.participants.includes(user.username) ? "" : "cursor-pointer"}`}>{ event.participants.includes(user.username) ? <span className=" text-white">Registered Successfully</span> : <span className="text-white"  style={{textDecorationLine: "underline"}} onClick={() => registerEvent(event.id, event.participants)}>Click Here To Register</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {roles?.find(role => [ROLES.Admin]?.includes(role)) && <div className="mt-8">
            <Link href="/newevent">
              <a className="block">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Add Event
                </button>
              </a>
            </Link>
        </div>}
      </>
      }
    </section>
    </div>
  );
};

export default Events;

import React, { useEffect, useState } from "react";
import "../css/events.css";
import image from "../assets/image.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "./EventCard";

function Events() {
  const navigate = useNavigate();
  const token = localStorage.getItem("ignisAccessToken");
  const configHeader = { Authorization: `Bearer ${token}` };
  const [eventsArray, setEventsArray] = useState([]);
  const [activeTab, setActiveTab] = useState("All Events");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/all-events")
      .then((response) => response.data)
      .then((result) => {
        setEventsArray(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
    
  const handleLogout = () => {
    localStorage.removeItem("ignisAccessToken");
    navigate("/");
  };

  const fetchUserEvents = () => {
    axios
      .get("http://127.0.0.1:8000/api/user/event", {
        headers: configHeader,
      })
      .then((response) => response.data)
      .then((result) => {
        setEventsArray(result.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchAllEvents = () => {
    axios
      .get("http://127.0.0.1:8000/api/all-events")
      .then((response) => response.data)
      .then((result) => {
        setEventsArray(result.data);
      })
      .catch((err) => console.log(err));
    };
    
  const toggleLikes = (id) => {
    console.log("detected like button");
    console.log(id);
    axios
      .put(
        "http://127.0.0.1:8000/api/user/event",
        { event_id: id.toString() },
        {
          headers: configHeader,
        }
      )
      .then((response) => response.data)
      .then((result) => {
        setEventsArray(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="events__container">
      <nav>
        <button
          onClick={() => {
            fetchAllEvents();
            setActiveTab("All Events");
          }}
          className={activeTab === "All Events" ? "active" : ""}
        >
          All Events
        </button>
        <button
          onClick={() => {
            navigate("/events/add");
          }}
        >
          Add Events
        </button>
        <button
          onClick={() => {
            fetchUserEvents();
            setActiveTab("My Events");
          }}
          className={activeTab === "My Events" ? "active" : ""}
        >
          My Events
        </button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {eventsArray.length > 0 ? (
        eventsArray.map((event) => {
          return (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.name}
              time={event.time}
              location={event.location}
              data={event.data}
              image={event.image}
              toggleLike={toggleLikes}
              usersWholiked={event.user_liked}
            />
          );
        })
      ) : (
        <h1 className="event__card-text">No Event Available</h1>
      )}
    </main>
  );
}

export default Events;

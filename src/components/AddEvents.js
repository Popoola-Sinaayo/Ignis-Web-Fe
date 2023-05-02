import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/events.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEvents() {
  const navigate = useNavigate();
  const token = localStorage.getItem("ignisAccessToken");
  const configHeader = { Authorization: `Bearer ${token}` };
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(eventName, location, date, selectedImage);
    const convertedDate = new Date(date);
    const formData = new FormData();
    formData.append("name", eventName);
    formData.append("location", location);
    formData.append("date", convertedDate.toISOString());
    formData.append("data", description);
    formData.append("image", selectedImage);
    axios
      .post("http://127.0.0.1:8000/api/user/event", formData, {
        headers: configHeader,
      })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        if (result?.message === "success") {
          alert("Event Created");
          navigate("/events");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <main className="addevents__container">
      <section className="addevents">
        <h1>Add New Event</h1>
        <form onSubmit={handleSubmit}>
          <label>Event Name</label>
          <br />
          <input
            type="text"
            name="event name"
            placeholder="Event Name"
            onChange={(e) => setEventName(e.target.value)}
          />
          <br />
          <label>Location</label>
          <br />
          <input
            type="text"
            name="location"
            placeholder="Lagos, Nigeria"
            onChange={(e) => setLocation(e.target.value)}
          />
          <br />
          <label>Date</label>
          <br />
          <input
            type="datetime-local"
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <label>Description</label>
          <br />
          <input type="text" onChange={(e) => setDescription(e.target.value)} />
          <br />
          <label>Image</label>
          <br />
          <input
            type="file"
            alt="event-image-selector"
            onChange={(e) => setSelectedImage(e.target.files[0])}
          />
          <br />
          <button>Add New Event</button>
          <p>
            <Link to="/events" className="events-link">
              Back
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default AddEvents;

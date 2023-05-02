import React, { useEffect, useState } from "react";
import "../css/events.css";
import defaultImage from "../assets/image.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UploadIcon from "@mui/icons-material/Upload";
function EventCard({
  id,
  title,
  time,
  location,
  data,
  image,
  toggleLike,
  usersWholiked,
}) {
  const [isLiked, setisLiked] = useState(false);
  const userId = localStorage.getItem("ignisUserId");
  useEffect(() => {
    const checkLike = usersWholiked.findIndex((user) => {
      return user.id.toString() === userId;
    });
    if (checkLike !== -1) {
      setisLiked(true);
    } else {
      setisLiked(false);
    }
  }, [usersWholiked]);
  return (
    <section className="events__card">
      <div>
        <h1>{title}</h1>
        <p>{data}</p>
        <p>{new Date(time).toDateString()}</p>
        <p>{location}</p>
      </div>
      <div>
        {image !== null ? (
          <img src={`http://localhost:8000${image}`} alt="card" />
        ) : (
          <img src={defaultImage} alt="card" />
        )}
        <div className="events__card-icon">
          {isLiked ? (
            <FavoriteIcon
              sx={{ color: "#f05537" }}
              fontSize="large"
              className="card-icon"
              onClick={() => toggleLike(id)}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: "#f05537" }}
              fontSize="large"
              className="card-icon"
              onClick={() => toggleLike(id)}
            />
          )}
          <UploadIcon fontSize="large" className="card-icon" />
        </div>
      </div>
    </section>
  );
}

export default EventCard;

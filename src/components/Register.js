import React from "react";
import { Link } from "react-router-dom";
import "../css/register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register", {
        email: email,
        password: password,
        name: username,
      })
      .then((response) => response.data)
      .then((result) => {
        console.log(result);
        if (result?.status === "success") {
          localStorage.setItem("ignisAccessToken", result.token.access);
          navigate("/events");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <main className="register__container">
      <section className="register">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="email@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Username</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="popoola"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="*********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button>Register</button>
          <p>
            <Link to="/" className="login-link">
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;

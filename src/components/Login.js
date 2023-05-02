import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      })
      .then((response) => response.data)
      .then((result) => {
        if (result?.status === "success") {
          localStorage.setItem("ignisAccessToken", result.token.access);
          localStorage.setItem("ignisUserId", result.data.id);
          navigate("/events");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <main className="login__container">
      <section className="login">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="email@email.com"
            onChange={(e) => setEmail(e.target.value)}
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
          <button>Login</button>
          <p>
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;

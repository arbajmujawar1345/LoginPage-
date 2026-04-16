import { useState } from "react";
import axios from "axios";
import "./style.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      window.location.href = "/dashboard"; // redirect
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg">
      <div className="card">
        <h1>🌾 AgriVision</h1>
        <h3>Login</h3>

        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

          <button>Login</button>
        </form>

        <p>
          New user? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;


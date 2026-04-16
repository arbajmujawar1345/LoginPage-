import { useState } from "react";
import axios from "axios";
import "./style.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    // Name
    if (!/^[A-Za-z ]{3,}$/.test(form.name)) {
      newErrors.name = "Name must be at least 3 letters";
    }

    // Email
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter valid email";
    }

    // Phone
    if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    // Location
    if (form.location.trim() === "") {
      newErrors.location = "Location is required";
    }

    // Password
    if (form.password.length < 6) {
      newErrors.password = "Min 6 characters";
    }

    // Confirm Password
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registration Successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>🌾 AgriVision</h2>
        <p>Create Account</p>

        <form onSubmit={handleSubmit}>

          <input name="name" placeholder="Full Name" onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}

          <input name="email" placeholder="Email" onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}

          <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}

          <input name="location" placeholder="Location" onChange={handleChange} />
          {errors.location && <span className="error">{errors.location}</span>}

          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}

          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

          <button>Register</button>
        </form>

        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
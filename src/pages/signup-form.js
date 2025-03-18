


"use client";

import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",  // ✅ Changed from "mobileNumber" to "phone"
  });
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    phone: false,  // ✅ Updated field name
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: !formData.fullName,
      email: !formData.email || !/\S+@\S+\.\S+/.test(formData.email),
      password: !formData.password || formData.password.length < 6,
      phone: !formData.phone || !/^\d{10}$/.test(formData.phone),
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      try {
        const requestBody = {
          fullName: formData.fullName,  // ✅ Fix: Use fullName instead of firstName/lastName
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        };

        const response = await axios.post("https://bookstore.incubation.bridgelabz.com/bookstore_user/registration", requestBody);

        console.log("Signup successful:", response.data);

        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("token", response.data.token);

        alert("Registration Successful!");
      } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        alert("Signup failed! Please try again.");
      }
    }
};

  
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="fullName" className="form-label error-label">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          className={`form-input ${errors.fullName ? "error-input" : ""}`}
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          required
        />
        {errors.fullName && <span className="error-text">Enter full name</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Id
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-input ${errors.email ? "error-input" : ""}`}
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error-text">Enter a valid email address</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="password-input-container">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className={`form-input ${errors.password ? "error-input" : ""}`}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" className="password-toggle" onClick={handleClickShowPassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>
        {errors.password && <span className="error-text">Password must be at least 6 characters</span>}
      </div>

      <div className="form-group">
  <label htmlFor="phone" className="form-label">
    Mobile Number
  </label>
  <input
    id="phone"
    name="phone"  // ✅ Match the state variable name
    className={`form-input ${errors.phone ? "error-input" : ""}`}  // ✅ Use correct error state
    value={formData.phone}
    onChange={handleChange}
    required
  />
  {errors.phone && <span className="error-text">Enter a valid 10-digit mobile number</span>}
</div>


      <button type="submit" className="submit-button">
        Signup
      </button>
    </form>
  );
}

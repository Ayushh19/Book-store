"use client";

import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors
  
    try {
      const response = await axios.post(
        "https://bookstore.incubation.bridgelabz.com/bookstore_user/login",
        { email, password },
        { headers: { "Content-Type": "application/json", "Accept": "application/json" } }
      );
  
      const { success, message, result } = response.data;
  
      if (!success) {
        // API returned failure, handle it manually
        setError(message || "Login failed. Try again.");
        alert(message || "Login failed. Try again.");
        return;
      }
  
      const accessToken = result?.accessToken; // Ensure accessToken exists
  
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken); // Set accessToken first
        // alert("Login Successful! 🎉");
        navigate("/dashboard"); // Then navigate
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Try again.");
      alert(error.response?.data?.message || "Login failed. Try again.");
    }
  };
  

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Id
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label password-label">
          Password
        </label>
        <div className="password-input-container">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" className="password-toggle" onClick={handleClickShowPassword}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </button>
        </div>
        <div className="forgot-password-container">
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>
      </div>


      {error && <p className="error-message">{error}</p>}


      <button type="submit" className="submit-button">
        Login
      </button>

      <div className="divider">
        <span>OR</span>
      </div>

      <div className="social-buttons">
        <button type="button" className="facebook-button">
          <FacebookIcon className="social-icon" />
          <span>Facebook</span>
        </button>
        <button type="button" className="google-button">
          <GoogleIcon className="social-icon" />
          <span>Google</span>
        </button>
      </div>
    </form>
  );
}

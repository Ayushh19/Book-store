import { useState } from "react";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-container">
      {/* Left card with illustration */}
      <div className="left-card">
        <div className="illustration-container">
          <img
            src="/bookstoreimage.png"
            alt="Shopping cart with books"
            width={240}
            height={240}
            className="illustration"
          />
        </div>
        <h2 className="shop-title">ONLINE BOOK SHOPPING</h2>
      </div>

      {/* Right card with form */}
      <div className="right-card">
        <div className="tabs-container">
          <div
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            <span>LOGIN</span>
            {activeTab === "login" && <div className="tab-indicator"></div>}
          </div>
          <div
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            <span>SIGNUP</span>
            {activeTab === "signup" && <div className="tab-indicator"></div>}
          </div>
        </div>

        {activeTab === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}

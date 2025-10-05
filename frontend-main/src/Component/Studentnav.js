import React, { useState, useRef } from 'react';
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Context";
import "./Studentnav.css";
import { Link } from "react-router-dom";

function Studentnav() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const fileInputRef = useRef(null);
    const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login"); // or wherever your login route is
  };

  return (
    <div>
      <div className="header1">
        <Link to="/">
        <img src={logo} alt="PreneurX" className="logo" />
        </Link>
        <div className="hamburger" onClick={() => setDropdownVisible(!dropdownVisible)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <hr />

      <div className="navbar1">
        <div className="nav-links1">
 
<Link to="/dashboard">Profile</Link>
          <Link to="/classclash">Class Clash</Link>

          
          <Link to="/leaderboard">Leaderboard</Link>
                    <Link to="/rule">Rules</Link>
        </div>
      </div>

      <hr />

      {/* DROPDOWN MENU (MOBILE) */}
{dropdownVisible && (
  <div
    style={{
      position: "absolute",
      top: "60px",
      right: "20px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      minWidth: "220px",
      maxWidth: "90vw",
      zIndex: 1000,
      overflow: "hidden",
    }}
  >
    {/* Add/Change Profile Picture */}
    <button
      type="button"
      onClick={() => fileInputRef.current.click()}
      style={{
        padding: "14px 20px",
        fontWeight: 600,
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        color: "#083ca0", // Plain color to preserve emoji color
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        fontSize: "16px",
      }}
    >
      📸 <span style={{ background: "linear-gradient(to right, #083ca0, black)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Add/Change Profile Picture</span>
    </button>

    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePic", file);

        const student1 = JSON.parse(localStorage.getItem("studentUser"));
        const studentId = student1?._id;
        console.log(studentId);

        try {
          const res = await fetch(
            `https://backend-gpe5.onrender.com/api/student/upload-profile/${studentId}`,
            { method: "POST", body: formData }
          );

          const data = await res.json();
          if (res.ok) {
            alert("Profile picture updated!");
            window.location.reload();
          } else {
            alert(data.message || "Upload failed frontend");
          }
        } catch (err) {
          console.error("Upload error", err);
          alert("Server error");
        }
      }}
    />

    {/* Need Help */}
    <button
      type="button"
      style={{
        padding: "14px 20px",
        fontWeight: 600,
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        color: "#083ca0",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        fontSize: "16px",
      }}
    >
      ❓ <span style={{ background: "linear-gradient(to right, #083ca0, black)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Need Help</span>
    </button>

    {/* Notifications */}
    <button
      type="button"
      style={{
        padding: "14px 20px",
        fontWeight: 600,
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        color: "#083ca0",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        fontSize: "16px",
      }}
    >
      🔔  <span style={{ background: "linear-gradient(to right, #083ca0, black)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> Notifications</span>
    </button>

    {/* Logout */}
    <button
      type="button"
      onClick={handleLogout}
      style={{
        padding: "14px 20px",
        fontWeight: 600,
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: "pointer",
        color: "#ff4b2b",
        fontSize: "16px",
      }}
    >
      🚪 <span style={{ background: "linear-gradient(to right, #ff4b2b, #ff6b6b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Log Out</span>
    </button>
  </div>
)}

    </div>
  );
}

export default Studentnav;

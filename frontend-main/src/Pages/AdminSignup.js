import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Admin created successfully. Now login.");
        navigate("/admin-login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <input type="tel" placeholder="Contact Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup;
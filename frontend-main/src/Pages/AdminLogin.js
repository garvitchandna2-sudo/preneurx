import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/Context/Context";

const AdminLogin = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  console.log("Logging in with:", contactNumber, password);

  try {
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile: contactNumber, password })
    });

    const data = await res.json();
    console.log("Login response:", data);

    if (res.ok) {
      login(data.token, data.admin);
      console.log("Navigating to admin dashboard");
      navigate("/admin-dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    console.error("Error during login:", err);
    alert("Server error");
  }
};


  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="tel" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        
      </form>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;

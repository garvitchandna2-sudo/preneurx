import React from "react";
import { useAuth } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import RegisterUserForm from "../Component/RegisterUserForm";
import AdminRoundControl from "../Component/AdminRoundControl";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Welcome Admin</h2>
      <p>Phone: {user?.mobile}</p>


      <RegisterUserForm/>

      <AdminRoundControl/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;

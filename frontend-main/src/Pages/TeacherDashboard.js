import React from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../Component/Footer";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      

      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#083ca0" }}>Welcome to Teacher Dashboard</h1>
        <p>You can vote for up to 5 students in your school and class.</p>

        <button
          onClick={() => navigate("/teacher-vote")}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#083ca0",
            color: "#fff",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go to Voting Page
        </button>
      </div>

      <Footer />
    </>
  );
};

export default TeacherDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Context";
import Loading from "../Component/Loading";
import Footer from "../Component/Footer"; // Import Footer here
import Navbar from "../Component/Navbar"; // ✅ adjust the path if needed

const LoginPage = () => {
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, dob }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user, data.role);
        if (data.role === "student") {
          navigate("/dashboard");
        } else if (data.role === "teacher") {
          navigate("/tdash");
        }
      } else {
        alert(data.message || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div style={styles.page}>
      <Navbar /> {/* ✅ Navbar at top */}

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to continue</p>
          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label}>Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              style={styles.input}
            />
            <label style={styles.label}>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>

          {/* Help section below form */}
          <div style={styles.helpSection}>
            <p style={styles.helpText}>Need help logging in?<br/>You will be able to log in once your registration has been completed through your school.</p>
            <a
              href="https://wa.me/message/DYGTA4MBTTQQA1"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.whatsappButton}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: "#f4f6fa",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 0 40px", // ⬅️ Top padding for sticky navbar
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    color: "#083CA0",
    marginBottom: "8px",
    fontSize: "28px",
    textAlign: "center",
  },
  subtitle: {
    color: "#515151",
    marginBottom: "32px",
    fontSize: "14px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "6px",
    color: "#515151",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "16px",
  },
  helpSection: {
    marginTop: "20px",
    textAlign: "center",
  },
  helpText: {
    fontSize: "14px",
    color: "#515151",
    marginBottom: "8px",
  },
  whatsappButton: {
    display: "inline-block",
    backgroundColor: "#238636",
    color: "white",
    padding: "6px 10px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    fontFamily:"Plus Jakarta Sans",
    fontSize:"14px",
  },
  button: {
    backgroundColor: "#083CA0",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default LoginPage;

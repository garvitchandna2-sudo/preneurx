import React from "react";
import "./Privacy.css";
import Footer from "../Component/Footer";
import Navbar from "../Component/Navbar";
import { Link } from "react-router-dom";


const Privacy = () => {
  return (
    <>
    <Navbar/>
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
      </header>

      <div className="privacy-container">
        <p>
          <strong>PreneurX</strong> ("we", "our", or "us") is an EdTech company based in Deoria, Uttar Pradesh, India, committed to empowering students through innovative learning solutions and talent discovery. This Privacy Policy explains how we collect, use, protect, and share your information when you visit our website <Link to="https://preneurx.in" target="_blank" rel="noopener noreferrer">preneurx.in</Link> or use our services. By using our services, you agree to the terms of this Privacy Policy.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, date of birth, and any feedback you provide.</li>
          <li><strong>Voting Data:</strong> Your votes and preferences submitted during talent competitions or programs.</li>
          <li><strong>Usage Data:</strong> Information about how you use our platform, such as pages visited, time spent, and interactions.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Provide, improve, and personalize our services.</li>
          <li>Manage talent competitions and process your votes securely and anonymously.</li>
          <li>Communicate important updates, such as competition results or platform changes.</li>
          <li>Analyze user behavior to enhance our services.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2>3. Your Privacy and Data Security</h2>
        <p>All voting data is <strong>kept confidential and secret</strong>. We do not disclose individual votes to anyone. Your data is safe with us—we <strong>do not sell or share</strong> your personal information with third parties for marketing purposes. We take appropriate technical and organizational measures to protect your data from unauthorized access, disclosure, or misuse.</p>

        <h2>4. Sharing of Information</h2>
        <p>We may share your information only in the following limited circumstances:</p>
        <ul>
          <li>When <strong>required by law</strong> or to protect our legal rights, safety, or property.</li>
        </ul>
        <p>We do <strong>not</strong> sell your data.</p>

        <h2>5. Your Rights and Choices</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, correct, or delete your personal information.</li>
          <li>Opt-out of receiving marketing communications (by emailing us at <Link to="mailto:preneurxteam@gmail.com">preneurxteam@gmail.com</Link>).</li>
        </ul>
        <p>To exercise these rights, please contact us at <Link to="mailto:preneurxteam@gmail.com">preneurxteam@gmail.com</Link> or call us at +91 6386660600.</p>

        <h2>6. Cookies and Tracking</h2>
        <p>We may use cookies and similar technologies to enhance your experience on our website. You can control cookie preferences through your browser settings.</p>

        <h2>7. Children’s Privacy</h2>
        <p>Our services are intended for students, but we require consent from parents or guardians where applicable. We do not knowingly collect personal information from children under 10 without appropriate consent.</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on our website with an updated effective date. Please review this page periodically for updates.</p>

        <h2>9. Contact Us</h2>
        <p>
          <strong>PreneurX</strong><br />
          Deoria, Uttar Pradesh, India<br />
          Email: <Link to="mailto:preneurxteam@gmail.com">preneurxteam@gmail.com</Link><br />
          Phone: +91 6386660600<br />
          Website: <Link to="https://preneurx.in" target="_blank" rel="noopener noreferrer">https://preneurx.in</Link>
        </p>
      </div>

      <Footer/>
    </>
  );
};

export default Privacy;

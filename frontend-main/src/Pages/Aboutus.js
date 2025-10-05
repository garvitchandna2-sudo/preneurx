import React from 'react';
import Footer from '../Component/Footer';
import Navbar from '../Component/Navbar';
import { Link } from "react-router-dom";


const AboutUs = () => {
  const styles = {
    header: {
      background: 'linear-gradient(135deg, #083ca0, black)',
      color: '#fff',
      padding: '15px',
      textAlign: 'center',
    },
    h1: {
      margin: 0,
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      fontWeight: 700,
      fontSize: '30px',
    },
    container: {
      maxWidth: '900px',
      margin: '2rem auto',
      padding: '0 1.5rem',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      lineHeight: 1.6,
      color: '#121212',
    },
    h2: {
      fontWeight: 600,
      fontSize: '24px',
      background: 'linear-gradient(135deg, #083ca0, black)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent',
      marginTop: '1rem',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
    },
    p: {
      marginBottom: '1rem',
    },
    li: {
      marginBottom: '1rem',
    },
    ul: {
      marginLeft: '1.5rem',
    },
    a: {
      color: '#083ca0',
      textDecoration: 'none',
    },
    footer: {
      backgroundColor: '#121212',
      color: '#fff',
      padding: '40px 20px 20px',
    },
    footerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1100px',
      margin: '0 auto',
      gap: '20px',
    },
    footerBrandImg: {
      width: '120px',
      height: 'auto',
      marginBottom: '1px',
    },
    footerLinks: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
    },
    footerLink: {
      color: '#fff',
      fontWeight: 500,
      fontSize: '14px',
      textDecoration: 'none',
    },
    footerLinkHover: {
      color: '#083ca0',
    },
    footerSocialImg: {
      width: '24px',
      height: '24px',
      marginRight: '12px',
      transition: 'transform 0.3s',
    },
    footerBottom: {
      textAlign: 'center',
      fontSize: '14px',
      color: '#ccc',
      marginTop: '20px',
    },
  };

  return (
    <div style={{ background: 'white', margin: 0, padding: 0 }}>
      <Navbar/>
      <header style={styles.header}>
        <h1 style={styles.h1}>About Us</h1>
      </header>

      <div style={styles.container}>
        <p style={styles.p}>
          <strong>PreneurX</strong> is an EdTech platform built with passion to empower students, foster talent, and unlock creativity. We believe that every student deserves a stage to shine, and we’re on a mission to create a space where talent meets opportunity.
        </p>

        <h2 style={styles.h2}>Our Mission</h2>
        <p style={styles.p}>
At PreneurX, we aim to inspire, educate, and elevate students by providing engaging competitions, learning resources, and mentorship programs that nurture creativity, leadership, and innovation. Whether it’s through exciting events like the PreneurX Talent Clash or by building a supportive community, we are here to make a difference.

Looking ahead, our vision is to establish a one-of-a-kind school that blends academics with real-world skills, creativity, and entrepreneurship from an early age. We believe in reimagining education beyond textbooks—focusing on practical learning, student expression, and innovation.

In the near future, we also plan to launch inter-school competitions, bringing together young talent from across the country to collaborate, compete, and grow together on a larger stage.

PreneurX is not just a platform—it's a movement to shape the leaders of tomorrow.        </p>

        <h2 style={styles.h2}>The Team Behind PreneurX</h2>
        <p style={styles.p}>
          Our team brings together some of the brightest minds from premier institutions like <strong>IITs, NITs, SIT, VIT, LPU, and more</strong>. This diverse and talented group of technologists, designers, and creators works tirelessly to ensure the best possible experience for students across the country.
        </p>

        <h2 style={styles.h2}>What We Offer</h2>
        <ul style={styles.ul}>
          <li style={styles.li}><strong>Talent Competitions:</strong> A platform to showcase your skills and get recognized.</li>
          <li style={styles.li}><strong>Learning Resources:</strong> Tools, guides, and insights to help you grow.</li>
          <li style={styles.li}><strong>Community Support:</strong> A network of peers, mentors, and enthusiasts cheering for your success.</li>
        </ul>

        <h2 style={styles.h2}>Join Us</h2>
        <p style={styles.p}>
          Be part of a community that believes in you. Whether you’re a student looking for inspiration, a teacher wanting to support your students, or a parent cheering from the sidelines, PreneurX is here to empower your journey.
        </p>

        <p style={styles.p}>
          Have questions? Reach out to us at <Link to="mailto:preneurxteam@gmail.com" style={styles.a}>preneurxteam@gmail.com</Link> or visit our website <Link to="https://preneurx.in" style={styles.a}>preneurx.in</Link>.
        </p>
      </div>

      <Footer/>
    </div>
  );
};

export default AboutUs;

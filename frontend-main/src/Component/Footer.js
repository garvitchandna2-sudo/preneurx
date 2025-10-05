import React from 'react';
import './Footer.css'
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import whatsappIcon from '../assets/whatsapp.png'; 
import linkedinIcon from '../assets/linkedin.png'; 
import instagramIcon from '../assets/instagram.png'; 

function Footer() {
  return (
    <div className='footer'>
      <div className="footer-container">
        <div className="footer-brand">
<Link to="/">
        <img src={logo} alt="Company Logo" className="logo" />
        </Link>        </div>
        {/* <Logo/> */}

        <div className="footer-links">
          <Link to="/">Home</Link> 
          <Link to="/about">About Us</Link>
          <Link to="/policy">Privacy Policy</Link>


        
          <Link to="/terms">Terms & Conditions</Link> 
          <Link to="/contact">Contact Us</Link>


        </div>

       <div className="footer-social flex items-center ">
  <Link to="https://wa.me/message/DYGTA4MBTTQQA1">
    <img src={whatsappIcon} alt="WhatsApp" className="h-6 w-6" />
  </Link>
  <Link to="https://www.instagram.com/preneurx?igsh=MXBtcmE1N21veTI4YQ==">
    <img src={instagramIcon} alt="Instagram" className="h-6 w-6" />
  </Link>
<Link to="https://www.linkedin.com/company/preneurx">
    <img src={linkedinIcon} alt="LinkedIn" className="h-6 w-6" />
  </Link>
</div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 PreneurX. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;

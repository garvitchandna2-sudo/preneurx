import React from 'react'
import "./Terms.css";
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import { Link } from "react-router-dom";


function Terms() {
  return (
    
        <>
        <Navbar/>
      <header className="header">
        <h1>Terms & Conditions</h1>
      </header>

      <div className="container1">
        <p>
          <strong>PreneurX</strong> ("we", "our", or "us") is an EdTech company
          based in Deoria, Uttar Pradesh, India. By using our website{" "}
          <Link to="https://preneurx.in" target="_blank" rel="noopener noreferrer">
            preneurx.in
          </Link>{" "}
          or participating in our talent competitions, you agree to the following Terms
          and Conditions.
        </p>

        <h2>1. Eligibility</h2>
        <p>
          Participants must be students of eligible classes as specified in the
          competition guidelines. By participating, you confirm that you meet all
          eligibility criteria.
        </p>

        <h2>2. Voting Rules</h2>
        <ul>
          <li>Each student is allowed to cast one vote and one super vote in a competition.</li>
          <li>Teachers is allowed to cast five votes to 5 different students (one per student).</li>
          <li>Voting data is confidential and cannot be shared with other participants.</li>
        </ul>

        <h2>3. Awards and Rewards</h2>
        <ul>          
          <li>
            The final decision regarding rewards lies solely with the PreneurX team, and it is binding.
          </li>
        </ul>

        <h2>4. Code of Conduct</h2>
        <ul>
          <li>Participants must adhere to fair play and honesty while voting and participating.</li>
          <li>Any attempt to manipulate results or engage in unfair practices may lead to disqualification.</li>
        </ul>

        <h2>5. Data Usage</h2>
        <p>
          By participating, you consent to the use of your submitted information (such as votes, feedback,
          and personal details) for managing the competition, analyzing results, and communicating updates.
          Your data will not be sold to third parties.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          We strive to maintain accurate competition results, but we are not liable for any technical errors,
          vote discrepancies, or platform issues. All decisions by the PreneurX team are final.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We may modify these Terms and Conditions at any time. Updated terms will be posted on our website.
          Continued use of our services signifies acceptance of any changes.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          For any questions or clarifications regarding these Terms and Conditions, please contact us at:
        </p>
        <p>
          <strong>PreneurX</strong>
          <br />
          Deoria, Uttar Pradesh, India
          <br />
          Email: <Link to="mailto:preneurxteam@gmail.com">preneurxteam@gmail.com</Link>
          <br />
          Phone: +91 6386660600
          <br />
          Website:{" "}
          <Link to="https://preneurx.in" target="_blank" rel="noopener noreferrer">
            https://preneurx.in
          </Link>
        </p>
      </div>

    <Footer/>
    </>
   
    
  )
}

export default Terms

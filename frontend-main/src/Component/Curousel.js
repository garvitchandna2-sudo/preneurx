import React from 'react'
import { Link } from "react-router-dom";

import './Curousel.css';
function Curousel() {
    return (
        <div className='abc'>
        <hr/>
        
            <div className="mobile-carousel">
                
                <div className="carousel-option"><Link to="/">Home</Link></div>
              <div className="carousel-option"><Link to="/about">Our Mission</Link></div>

                <div className="carousel-option"><Link to="/rule">Rules</Link></div>                
                <div className="carousel-option"><Link to="/contact">Contact Us</Link></div>
                <div className="carousel-option"><Link to="/team">Team</Link></div>
              
       

            </div>
        <hr/>

        </div>
    )
}

export default Curousel

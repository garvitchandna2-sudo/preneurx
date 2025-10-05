import React, { useState,useEffect } from 'react';
import logo from '../assets/logo.png';
import search from '../assets/search.png';


function NavwithS() {
      const [searchTerm, setSearchTerm] = useState('');
  
    

      const [width, setWidth] = useState(window.innerWidth);
    
      useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  return (
    <div>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', background: '#f5f8fa', color: '#333', margin: 0 }}>
              <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'white', position: 'sticky', top: 0, zIndex: 1000 }}>
                <img src={logo} alt="Company Logo" className="logo"/>
        
        
                {/* <div className="navbar1" style={{background:'#f5f8fa', borderRadius:'500px', margin:'0px 20px 0px 20px', padding:'0px'}}>
                <div className="nav-links1" >
                            <a href="/dashboard">Home</a>
        
                  <a href="/classclash">Clash class</a>
                        <a href="/round2">School Showdown</a>
                        <a href="/finale">PreneurX Talent-Clash</a>
                        <a href="/rules">Rules</a> */}
        
        
        
                
        {/*      
                </div>
              </div> */}
        
              
        
        
        
        
        
                <div style={{ position: 'relative', flex: 1, maxWidth: `${50 * width / 100}px` }}>
                  
         <img 
                src={search} 
                alt="logo" 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  height: '20px',
                  width: '20px',
                  fontVariantCaps: 'pettie-caps'
                }} 
              />
                  <input
                    type="text"
                    placeholder="Search Preneurs"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: '6px 1px 5px 35px',
                      border: '2px solid',
                      borderImage: 'linear-gradient(to right, #083ca0, black) 1',
                      borderRadius: '5px',
                      fontSize: '15px',
                      background: 'url(search.png) no-repeat left 10px center',
                      backgroundSize: '18px 18px',
                      width: '100%'
                    }}
                  />
                </div>
              </header>
        <hr />
              <div className="navbar1" style={{background:'#f5f8fa', margin:'0px 0px 0px 0px', padding:'0px'}}>
                <div className="nav-links1" >
                            <Link to="/dashboard">Home</Link>
        
                  <Link to="/classclash">Class Clash</Link>
                        <Link to="/round2">School Showdown</Link>
                        <Link to="/finale">PreneurX Talent Clash</Link>
                        <Link to="/rules">Rules</Link>
        
        
        
           
                </div>
              </div> 
        
              
        
              <hr />
        
        
        
        
        
        
        </div>
        



    </div>
  )
}

export default NavwithS

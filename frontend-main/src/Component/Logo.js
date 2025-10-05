import React from 'react'

function Logo() {
    const gradientStyle = {
        background: 'linear-gradient(to right, #0e1010,rgb(13, 94, 201))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        fontSize: '1.4rem',
        fontFamily: 'DM Sans, sans-serif',
    };
    const alpha ={
        fontFamily: 'DM Sans, sans-serif',


    };
  return (
    <div>
        <div className="left-section">
                {/* Logo with gradient */}
                <span style={gradientStyle}>P
                <span style={{...gradientStyle, fontSize: '1rem' }}>RENEUR</span>
                <span style={alpha}>X</span>


                </span>
                
            </div>
        

    </div>
  )
}

export default Logo
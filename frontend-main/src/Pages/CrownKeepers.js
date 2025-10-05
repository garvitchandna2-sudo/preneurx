import React from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const CrownKeepers = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#083ca0] to-black text-white text-center px-4">
      <div>
        <h1
          className="text-4xl sm:text-6xl font-bold text-white mb-4"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          👑 CrownKeepers
        </h1>
        <p
          className="text-2xl sm:text-4xl font-semibold text-white opacity-90"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Coming Soon...
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CrownKeepers;

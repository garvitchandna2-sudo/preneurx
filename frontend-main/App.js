

import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './Component/Navbar';
import Curousel from './Component/Curousel';
import Home from './Pages/Home';
import Loading from '../src/Component/Loading'; // Make sure path is correct
import Home from './Pages/Home';
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // If already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="App">
      {loading && <Loading />} {/* Preloader at top */}
      {!loading && (
        <>
          
          <Home />
        </>
      )}
    </div>
  );
}

export default App;





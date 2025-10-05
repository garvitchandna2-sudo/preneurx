import React, { useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <DotLottieReact
        src="https://lottie.host/61ab2c58-b4d6-45f1-b2c8-a4f17a341d8d/Clq2lMc5mV.lottie"
        loop
        autoplay
        style={{ width: '300px', height: '300px' }}
      />
    </div>
  );
};

export default Loading;

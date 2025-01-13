import React, { useEffect } from 'react';

const Logo = () => {
  // Load custom fonts using WebFont loader
  useEffect(() => {
    const WebFont = require('webfontloader');
    WebFont.load({
      google: {
        families: ['Orbitron', 'sans-serif']
      }
    });
  }, []);

  return (
    <div className="flex justify-center items-center py-6 bg-gradient-to-r from-[#111111] to-[#1c1c1c] rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#39FF14] tracking-wide mb-2 drop-shadow-lg font-orbitron">
          Reflexion
        </h1>
        <p className="text-lg font-light text-[#A8FF4D] tracking-wider font-orbitron">
          My Diary
        </p>
      </div>
    </div>
  );
};

export default Logo;

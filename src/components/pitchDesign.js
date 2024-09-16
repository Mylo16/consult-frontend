import React from 'react';

const VerticalPitch = () => {
   return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pitch Background */}
      <polygon points="20,10 280,10 400,300 -100,300" fill="#00a651" />

      {/* Outer Border */}
      <polygon points="20,10 280,10 400,300 -100,300" fill="none" stroke="white" strokeWidth="1" />

      {/* Midline (Horizontal) */}
      <line x1="0" y1="145" x2="300" y2="145" stroke="white" strokeWidth="1" />

      {/* Center Circle (slightly elliptical for perspective) */}
      <ellipse cx="150" cy="145" rx="40" ry="18" stroke="white" strokeWidth="1" fill="none" />

      {/* Center Spot */}
      <circle cx="150" cy="145" r="2" fill="white" />

      {/* Penalty Area - Bottom */}
      <polygon points="70,250 250,250 260,300 60,300" fill="none" stroke="white" strokeWidth="1" />

      {/* Goal Area - Bottom */}
      <polygon points="115,275 205,275 210,300 110,300" fill="none" stroke="white" strokeWidth="1" />

      {/* Penalty Spot - Bottom */}
      <circle cx="150" cy="500" r="4" fill="white" />

      <path d="M 210 250 A 30 10 0 10 100 250 180" fill="none" stroke="white" strokeWidth="1" />

      {/* Penalty Area - Top */}
      <polygon points="80,10 220,10 230,60 70,60" fill="none" stroke="white" strokeWidth="1" />

      {/* Goal Area - Top */}
      <polygon points="115,10 185,10 190,40 110,40" fill="none" stroke="white" strokeWidth="1" />

      <path d="M 100 60 A 30 10 0 1 0 200 60" fill="none" stroke="white" strokeWidth="1" />

      {/* Corner Arcs - Bottom */}
      <path d="M20,590 Q25,580 30,590" fill="none" stroke="white" strokeWidth="2" />
      <path d="M280,590 Q275,580 270,590" fill="none" stroke="white" strokeWidth="2" />

      {/* Corner Arcs - Top */}
      <path d="M0,10 Q5,15 10,10" fill="none" stroke="white" strokeWidth="2" />
      <path d="M300,10 Q295,15 290,10" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  );
};

export default VerticalPitch;

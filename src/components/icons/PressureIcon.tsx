import React from 'react';

interface IconProps {
  size?: number;
  value?: number;
}

const PressureIcon: React.FC<IconProps> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="35" y="90" fill="#ddd" fontSize="12">Low</text>
    <text x="65" y="90" fill="#ddd" fontSize="12">High</text>
    
    {/* Pressure Arc */}
    <path
      d="M 20 70 A 40 40 0 0 1 80 70"
      stroke="#4488FF"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
    />
    
    {/* Background Arc */}
    <path
      d="M 20 70 A 40 40 0 0 1 80 70"
      stroke="#ddd"
      strokeWidth="2"
      fill="none"
      strokeOpacity="0.3"
    />
  </svg>
)

export default PressureIcon;

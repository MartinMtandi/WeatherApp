import React from 'react';

interface IconProps {
  size?: number;
  value?: number;
}

const UVIcon: React.FC<IconProps> = ({ size = 56}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="95" y="20" fill="#ddd" fontSize="12" textAnchor="end">11+</text>
    <text x="95" y="90" fill="#ddd" fontSize="12" textAnchor="end">0</text>
    
    {/* UV Index Circle */}
    <circle 
      cx="50" 
      cy="50" 
      r="30" 
      stroke="#ddd" 
      strokeWidth="2"
      fill="#CCFFCC"
      opacity="0.6"
    />

    {/* Marker */}
    <path d="M65 50 L75 50" stroke="#ddd" strokeWidth="2" />
  </svg>
)

export default UVIcon;

import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
}

const WindIcon: React.FC<IconProps> = ({ size = 48, color = "#ddd" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 85 C25 85 15 65 15 50 C15 35 25 15 50 15 C75 15 85 35 85 50 C85 65 75 85 50 85"
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeDasharray="5,5"
    />
    <path
      d="M50 50 L65 35"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <text x="48" y="25" fill={color} fontSize="12">N</text>
    <circle cx="65" cy="35" r="8" fill="#88CCFF" />
  </svg>
)

export default WindIcon;

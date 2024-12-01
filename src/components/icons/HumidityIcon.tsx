import React from 'react';

interface IconProps {
  size?: number;
  value?: number;
}

const HumidityIcon: React.FC<IconProps> = ({ size = 48, value = 43 }) => {
  const height = (value / 100) * 70; // 70% of container for the fill

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="95" y="20" fill="#ddd" fontSize="12" textAnchor="end">100</text>
      <text x="95" y="90" fill="#ddd" fontSize="12" textAnchor="end">0</text>
      
      {/* Container */}
      <rect x="30" y="10" width="30" height="80" rx="15" stroke="#ddd" strokeWidth="2" fill="none" />
      
      {/* Fill */}
      <rect 
        x="32" 
        y={90 - height} 
        width="26" 
        height={height} 
        rx="13"
        fill="url(#humidityGradient)" 
      />

      {/* Marker */}
      <path d="M65 50 L75 50" stroke="#ddd" strokeWidth="2" />

      <defs>
        <linearGradient id="humidityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default HumidityIcon;

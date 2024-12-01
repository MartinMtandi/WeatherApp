import React from 'react';
import styled from 'styled-components';

interface CenterProps {
  children: React.ReactNode;
}

const Center: React.FC<CenterProps> = ({ children }) => {
  return <StyledCenter>{children}</StyledCenter>;
};

const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default Center;

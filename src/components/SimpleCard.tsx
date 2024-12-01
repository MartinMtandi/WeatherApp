import React from "react";
import { styled } from "styled-components";

interface SimpleCardProps {
  children: React.ReactNode;
}

const SimpleCard: React.FC<SimpleCardProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.cardBg};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

export default SimpleCard;

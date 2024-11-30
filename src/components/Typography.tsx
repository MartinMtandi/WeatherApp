import React from "react";
import styled from "styled-components";

interface TypographyProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  hoverColor?: string; 
  hoverStyle?: React.CSSProperties;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  fontSize = "14px",
  fontWeight = "500",
  color = "#ddd",
  hoverColor,
  hoverStyle,
  children,
}) => {
  return (
    <StyledTypography
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      hoverColor={hoverColor}
      hoverStyle={hoverStyle}
    >
      {children}
    </StyledTypography>
  );
};

const StyledTypography = styled.div<TypographyProps>`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  line-height: 1.25rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    color: ${(props) => props.hoverColor || props.color};
    ${(props) => props.hoverStyle && { ...props.hoverStyle }};
  }
`;

export default Typography;

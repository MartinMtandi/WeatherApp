import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import { Forecast } from "../utils/types/forecast";

interface TileProps {
  forecast: Forecast;
}

const Tile: React.FC<TileProps> = ({ forecast }) => {
  return (
    <TileWrapper>
      <Container>
        <StyledTypography>
          <Typography fontWeight="300" fontSize="18px" color="#d1d5db">
            {forecast.day}
          </Typography>
        </StyledTypography>
        <Divider />
        <StyledTypography>
          <Typography fontWeight="300" fontSize="24px" color="#6b7280">
            {forecast.temp}&deg;
          </Typography>
        </StyledTypography>
      </Container>
      <CurvyLineWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient
              id="fadeGradient"
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "transparent", stopOpacity: 0 }}
              />
              <stop
                offset="30%"
                style={{ stopColor: "#ddd", stopOpacity: 1 }}
              />
              <stop
                offset="70%"
                style={{ stopColor: "#ddd", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "transparent", stopOpacity: 0 }}
              />
            </linearGradient>
          </defs>

          {/* Wavy Path */}
          <path
            d="
            M0 75 
            C50 0, 100 150, 150 75   
            S250 50, 300 75          
            S400 0, 450 75           
            S500 100, 550 75        
          "
            stroke="url(#fadeGradient)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </CurvyLineWrapper>
    </TileWrapper>
  );
};

const Divider = styled.div`
  height: 126px;
  border-left: 1px dashed #6b7280;
  margin: 6px 0px;
  transition: border-left-color 0.3s ease;
`;

const CurvyLineWrapper = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    ${Divider} {
      border-left-color: #ddd;
    }

    div {
      color: #ddd;
    }
  }
`;

// Styled wrapper for Typography to handle hover
const StyledTypography = styled.div`
  transition: color 0.3s ease;
  color: inherit; /* Use inherited color */

  ${Container}:hover & {
    color: #fff;
  }
`;

const TileWrapper = styled.div`
  min-width: 110px;
  padding: 10px 0;
  border: 1px solid transparent;
  border-radius: 0; /* Ensure initial radius is 0 */
  background: rgba(75, 85, 99, 0);
  transition: 
    background 0.4s ease, 
    border-color 0.4s ease, 
    border-radius 0.3s ease;

  &:hover {
    border-radius: 10px;
    background: rgba(75, 85, 99, 0.3);
    border: 1px solid #6b7280;
  }
`;


export default Tile;

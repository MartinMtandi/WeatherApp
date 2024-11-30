import React from "react";
import { Sun as SunIcon } from "react-feather";
import { styled } from "styled-components";
import Typography from "./Typography";

const Card: React.FC = () => {
  return (
    <Container>
      <Grid>
        <IconWrapper>
          <SunIcon size={26} />
        </IconWrapper>
        <Typography fontWeight="300" fontSize="24px">
          16&deg;
        </Typography>
      </Grid>
      <Typography fontWeight="300">Liverpool, UK</Typography>
      <Typography fontWeight="300" color="#6b7280">
        Rain Thunder
      </Typography>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #6b7280;
  border-radius: 10px;
  background: rgba(75, 85, 99, 0.3);
  padding: 10px;
  align-items: center;
  width: 100%;
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 16px;
`;

const IconWrapper = styled.div<{ $margin?: string }>`
  color: #9ca3af;
  margin: ${(props) => (props.$margin ? props.$margin : "0px")};
`;

export default Card;

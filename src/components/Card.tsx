import React from "react";
import { styled } from "styled-components";
import Typography from "./Typography";
import { RecentSearch } from "../utils/types/api_context";

const Card: React.FC<{ search: RecentSearch }> = ({ search }) => {
  return (
    <Container>
      <Grid>
        <IconWrapper>
          <WeatherIcon 
            src={`https://cdn.weatherbit.io/static/img/icons/${search.icon}.png`}
            alt={search.description}
          />
        </IconWrapper>
        <Typography fontWeight="300" fontSize="24px">
          {search.temp}&deg;
        </Typography>
      </Grid>
      <Typography fontWeight="300">{search.city}</Typography>
      <Typography fontWeight="300" color="#6b7280">
        {search.description}
      </Typography>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #6b7280;
  border-radius: 10px;
  background: rgba(75, 85, 99, 0.3);
  padding: 10px;
  width: 100%;
  min-width: 0;
  max-width: 48%;
  display: flex;
  flex-direction: column;
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 16px;
  gap: 8px;
`;

const IconWrapper = styled.div<{ $margin?: string }>`
  color: #9ca3af;
  margin: ${(props) => (props.$margin ? props.$margin : "0px")};
  flex-shrink: 0;
`;

const WeatherIcon = styled.img`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`;

export default Card;

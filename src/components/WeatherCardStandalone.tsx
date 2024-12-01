import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import SimpleCard from "./SimpleCard";
import { Forecast } from "../utils/types/forecast";

interface WeatherCardStandaloneProps {
  data: Forecast;
}

const WeatherCardStandalone: React.FC<WeatherCardStandaloneProps> = ({ data }) => {
  const formattedDate = new Date(data.datetime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <SimpleCard>
      <Container>
        <Typography fontSize="24px" fontWeight="600">{data.temp}°</Typography>
        <Typography fontSize="16px">{data.weather.description}</Typography>
        <WeatherIcon
          src={`https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`}
          alt="weather icon"
        />
        <Typography fontSize="14px" color="#666">{formattedDate}</Typography>
      </Container>
    </SimpleCard>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
`;

export default WeatherCardStandalone;

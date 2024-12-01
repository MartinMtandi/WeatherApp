import React from "react";
import styled from "styled-components";
import Typography from "./Typography";
import { useApiContext } from "../utils/context/ApiContext";
import { ApiResponse, WeatherData } from "../utils/types/api_context";

// This Component is hidden on larger screens
const Forecast: React.FC = () => {
  const { data, setSelectedDay, selectedDay } = useApiContext();
  const typedData = data as ApiResponse;
  const forecastData = typedData?.forecast?.data || [];

  // Get next 3 days from forecast
  const nextThreeDays = forecastData.slice(0, 3);

  const handleDayClick = (datetime: string | undefined) => {
    if (datetime) {
      setSelectedDay(datetime);
    }
  };

  return (
    <Container data-testid="forecast-container">
      <Typography fontWeight="500" fontSize="20px">
        Upcoming Forecast
      </Typography>
      {nextThreeDays.map((day: WeatherData) => (
        <StyledForecast 
          key={day.datetime}
          onClick={() => handleDayClick(day.datetime)}
          selected={selectedDay === day.datetime}
        >
          <Typography fontWeight="300" fontSize="16px">
            {new Date(day.datetime || "").toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </Typography>
          <IconWrapper>
            <WeatherIcon
              src={`https://cdn.weatherbit.io/static/img/icons/${day.weather?.icon}.png`}
              alt="Weather Icon"
            />
          </IconWrapper>
          <Typography fontWeight="300" fontSize="16px">
            {Math.round(day.temp || 0)}°
          </Typography>
        </StyledForecast>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: none;
  padding: 40px 0px 40px 0px;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

interface StyledForecastProps {
  selected?: boolean;
}

const StyledForecast = styled.div<StyledForecastProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${props => props.selected ? '#012845' : '#011d33'};
  border-radius: 10px;
  padding: 8px 16px;
  gap: 12px;
  height: 70px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #012845;
  }
`;

export default Forecast;

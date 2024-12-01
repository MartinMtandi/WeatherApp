import React, { useState, useEffect, useMemo } from "react";
import { styled } from "styled-components";
import Typography from "./Typography";
import Center from "./Center";
import viteLogo from "../assets/vite.svg";
import Square from "./Square";
import { useApiContext } from "../utils/context/ApiContext";
import { WeatherData, ApiResponse } from "../utils/types/api_context";
import Forecast from "./Forecast";

const Sidebar: React.FC = () => {
  const [time, setTime] = useState<string>("");
  const { data, selectedDay, recentSearches } = useApiContext();
  const typedData = data as ApiResponse;

  const weatherData = useMemo(() => {
    // If no selected day, or no data available, use current weather
    if (!selectedDay || !typedData?.forecast?.data) {
      if (!typedData?.current?.data?.[0]) {
        return {
          temp: 0,
          wind_spd: 0,
          wind_cdir: "N",
          rh: 0,
          uv: 0,
          pres: 0,
          wind_description: "Calm",
          dewpt: 0,
          weather: {
            description: "No data",
            icon: "c01d",
          },
        };
      }
      const current = typedData.current.data[0];
      return {
        temp: current.temp,
        wind_spd: Math.round(current.wind_spd * 3.6), // Convert m/s to km/h
        wind_cdir: current.wind_cdir,
        rh: Math.round(current.rh),
        uv: Math.round(current.uv),
        pres: Math.round(current.pres),
        wind_description: current.wind_spd < 5 ? "Light" : "Moderate",
        dewpt: Math.round(current.dewpt || 0),
        weather: current.weather,
      };
    }

    // Use selected day's forecast data
    const forecastData = typedData.forecast.data.find(
      (day: WeatherData) => day.datetime === selectedDay
    );

    if (!forecastData) {
      return {
        temp: 0,
        wind_spd: 0,
        wind_cdir: "N",
        rh: 0,
        uv: 0,
        pres: 0,
        wind_description: "Calm",
        dewpt: 0,
        weather: {
          description: "No data",
          icon: "c01d",
        },
      };
    }

    return {
      temp: forecastData.temp,
      wind_spd: Math.round(forecastData.wind_spd * 3.6),
      wind_cdir: forecastData.wind_cdir,
      rh: Math.round(forecastData.rh),
      uv: Math.round(forecastData.uv),
      pres: Math.round(forecastData.pres),
      wind_description: forecastData.wind_spd < 5 ? "Light" : "Moderate",
      dewpt: Math.round(forecastData.dewpt || 0),
      weather: forecastData.weather,
    };
  }, [typedData, selectedDay]);

  interface WeatherDataExtended extends WeatherData {
    wind_description?: string;
    dewpt?: number;
  }

  type SquareType = "wind" | "humidity" | "uv" | "pressure";

  interface SquareConfig {
    type: SquareType;
    title: string;
    value: number;
    unit?: string;
    subtitle?: string;
  }

  const getSquareConfig = (
    weatherData: WeatherDataExtended
  ): SquareConfig[] => [
    {
      type: "wind" as SquareType,
      title: "Wind",
      value: weatherData.wind_spd,
      unit: "km/h",
      subtitle: `${
        weatherData.wind_description || "N/A"
      } • From ${weatherData.wind_cdir.toLowerCase()}`,
    },
    {
      type: "humidity" as SquareType,
      title: "Humidity",
      value: weatherData.rh,
      unit: "%",
      subtitle: `Dew point ${weatherData.dewpt || 0}°`,
    },
    {
      type: "uv" as SquareType,
      title: "UV index",
      value: weatherData.uv,
      subtitle:
        weatherData.uv <= 2 ? "Low" : weatherData.uv <= 5 ? "Moderate" : "High",
    },
    {
      type: "pressure" as SquareType,
      title: "Pressure",
      value: weatherData.pres,
      unit: "mBar",
    },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Center>
        <LogoContainer>
          <Logo src={viteLogo} alt="Vite logo" />
          <Typography fontSize="20px">WeatherApp</Typography>
        </LogoContainer>
      </Center>
      <WeatherInfo>
        <TemperatureGroup>
          <Typography fontWeight="300" fontSize="64px">
            {Math.round(weatherData.temp || 0)}°
          </Typography>
          <WeatherIcon
            src={`https://cdn.weatherbit.io/static/img/icons/${weatherData.weather?.icon}.png`}
            alt="weather icon"
          />
        </TemperatureGroup>
        <Content>
          <Typography fontSize="17px" fontWeight="500">
            {weatherData.weather?.description}
          </Typography>
          <Typography fontWeight="300" fontSize="15px" color="#ddd">
            {weatherData.temp
              ? `Feels like ${Math.round(weatherData.temp - 5)}°`
              : "No data"}
          </Typography>
        </Content>
      </WeatherInfo>
      <Content>
        <CityContainer>
          <Typography fontSize="20px" fontWeight="500">
            {recentSearches.length > 0
              ? recentSearches[0].city
              : "No location selected"}
          </Typography>
        </CityContainer>
        <Typography fontWeight="300">
          {selectedDay
            ? new Date(selectedDay).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })
            : "Current conditions"}
        </Typography>
        <SquareGrid>
          {getSquareConfig(weatherData).map((config) => (
            <Square key={config.type} {...config} />
          ))}
        </SquareGrid>
      </Content>
      <Forecast />
      <Center>
        <Typography fontWeight="300" fontSize="26px">
          {time}
        </Typography>
      </Center>
    </Container>
  );
};

const Container = styled.div`
  background: rgb(1, 50, 83);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;

  @media (max-width: 1024px) {
    gap: 16px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  animation: spin 20s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const WeatherInfo = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin: 16px 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const TemperatureGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
`;

const SquareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const CityContainer = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export default Sidebar;

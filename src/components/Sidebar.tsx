import React, { useState, useEffect, useMemo } from 'react'
import { styled } from 'styled-components';
import Typography from './Typography';
import Center from './Center';
import viteLogo from '../assets/vite.svg';
import Square from './Square';
import { useApiContext } from '../utils/context/ApiContext';
import { WeatherData, ApiResponse } from '../utils/types/api_context';

const Sidebar: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const { data, selectedDay } = useApiContext();
  const typedData = data as ApiResponse;

  const weatherData = useMemo(() => {
    // If no selected day, or no data available, use current weather
    if (!selectedDay || !typedData?.forecast?.data) {
      if (!typedData?.current?.data?.[0]) {
        return {
          wind_spd: 0,
          wind_cdir: 'N',
          rh: 0,
          uv: 0,
          pres: 0,
          wind_description: 'Calm',
          dew_point: 0
        };
      }
      const current = typedData.current.data[0];
      return {
        wind_spd: Math.round(current.wind_spd * 3.6), // Convert m/s to km/h
        wind_cdir: current.wind_cdir,
        rh: Math.round(current.rh),
        uv: Math.round(current.uv),
        pres: Math.round(current.pres),
        wind_description: current.wind_spd < 5 ? 'Light' : 'Moderate',
        dew_point: Math.round(current.dewpt || 0)
      };
    }

    // Use selected day's forecast data
    const forecastData = typedData.forecast.data.find((day: WeatherData) => 
      day.datetime === selectedDay
    );

    if (!forecastData) {
      return {
        wind_spd: 0,
        wind_cdir: 'N',
        rh: 0,
        uv: 0,
        pres: 0,
        wind_description: 'Calm',
        dew_point: 0
      };
    }

    return {
      wind_spd: Math.round(forecastData.wind_spd * 3.6), // Convert m/s to km/h
      wind_cdir: forecastData.wind_cdir,
      rh: Math.round(forecastData.rh),
      uv: Math.round(forecastData.uv),
      pres: Math.round(forecastData.pres),
      wind_description: forecastData.wind_spd < 5 ? 'Light' : 'Moderate',
      dew_point: Math.round(forecastData.dewpt || 0)
    };
  }, [typedData, selectedDay]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
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
          <Typography fontSize='20px'>WeatherApp</Typography>
        </LogoContainer>
      </Center>
      <Content>
        <Typography fontWeight='300'>
          {selectedDay ? new Date(selectedDay).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          }) : 'Current conditions'}
        </Typography>
        <SquareGrid>
          <Square 
            type="wind"
            title="Wind" 
            value={weatherData.wind_spd} 
            unit="km/h" 
            subtitle={`${weatherData.wind_description} • From ${weatherData.wind_cdir.toLowerCase()}`}
          />
          <Square 
            type="humidity"
            title="Humidity" 
            value={weatherData.rh} 
            unit="%" 
            subtitle={`Dew point ${weatherData.dew_point}°`}
          />
          <Square 
            type="uv"
            title="UV index" 
            value={weatherData.uv} 
            subtitle={weatherData.uv <= 2 ? 'Low' : weatherData.uv <= 5 ? 'Moderate' : 'High'}
          />
          <Square 
            type="pressure"
            title="Pressure" 
            value={weatherData.pres} 
            unit="mBar"
          />
        </SquareGrid>
      </Content>
      <Center>
        <Typography fontWeight='300' fontSize='26px'>{time}</Typography>
      </Center>
    </Container>
  )
}

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
  gap: 10px;
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

const SquareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-template-rows: repeat(2, 1fr);   
  gap: 10px;
`;

export default Sidebar

import React, { useMemo } from "react";
import { ChevronRight as ChevronRightIcon } from "react-feather";
import styled from "styled-components";
import Typography from "./Typography";
import Card from "./Card";
import Tile from "./Tile";
import { useApiContext } from "../utils/context/ApiContext";
import { Forecast, TileForecast } from "../utils/types/forecast";

const WeatherCard: React.FC = React.memo(() => {
  const { data } = useApiContext();

  const weatherInfo = useMemo(() => {
    if (!data?.current?.data?.[0] || !data?.forecast?.data?.[0]) {
      return {
        temp: "N/A",
        high: "N/A",
        low: "N/A",
        description: "Loading..."
      };
    }

    const currentData = data.current.data[0];
    const forecastData = data.forecast.data[0];

    return {
      temp: Math.round(currentData.temp),
      high: Math.round(forecastData.high_temp),
      low: Math.round(forecastData.low_temp),
      description: currentData.weather.description
    };
  }, [data]);

  const forecastData = useMemo(() => {
    if (!data?.forecast?.data) return [];
    return data.forecast.data.slice(1, 7).map((forecast: Forecast): TileForecast => ({
      day: new Date(forecast.datetime).toLocaleDateString('en-US', { weekday: 'long' }),
      temp: Math.round(forecast.temp)
    }));
  }, [data]);

  return (
    <Row>
      <Grid>
        <CurrentTemperature>
          <Typography fontWeight="300" fontSize="80px">
            {weatherInfo.temp}&deg;
          </Typography>
          <Row>
            <Pill>
              <Typography color="#6b7280">H</Typography>
              <Typography>{weatherInfo.high}&deg;</Typography>
            </Pill>
            <Pill>
              <Typography color="#6b7280">L</Typography>
              <Typography>{weatherInfo.low}&deg;</Typography>
            </Pill>
          </Row>
        </CurrentTemperature>
        <Feature>
          <Typography fontWeight="300">
            With real time data and advanced technology, we provide reliable
            forecasts for any location around the world.
          </Typography>
        </Feature>
      </Grid>
      <Grid>
        <Typography color="#d1d5db" fontWeight="400" fontSize="54px">
          {weatherInfo.description}
        </Typography>
        <Feature>
          <Row $gap={8}>
            <Grid>
              <Typography color="#6b7280">Recently Searched</Typography>
              <Link>
                <Typography>
                  See all{" "}
                  <IconWrapper $margin="5px 0 0 4px">
                    <ChevronRightIcon size={16} />
                  </IconWrapper>
                </Typography>
              </Link>
            </Grid>
            <Grid>
              <Card />
              <Card />
            </Grid>
          </Row>
        </Feature>
      </Grid>
      <Grid>
        {forecastData.map((forecast: TileForecast) => (
          <Tile
            key={forecast.day}
            forecast={forecast}
          />
        ))}
      </Grid>
    </Row>
  );
});

const Grid = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

const CurrentTemperature = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;
`;

const IconWrapper = styled.div<{ $margin?: string }>`
  color: #9ca3af;
  margin: ${(props) => (props.$margin ? props.$margin : "0px")};
`;

const Row = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap || 4}px;
  justify-content: space-around;
  height: 90%;
`;

const Pill = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #6b7280;
  border-radius: 16px;
  padding: 4px 15px;
  width: 100px;
`;

const Feature = styled.div`
  width: 28%;
`;

const Link = styled.button`
  background: transparent;
  border: none;
  padding: 4px 0px 4px 4px;
  cursor: pointer;
`;

export default WeatherCard;

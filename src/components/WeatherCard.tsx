import React, { useMemo } from "react";
import { ChevronRight as ChevronRightIcon } from "react-feather";
import styled from "styled-components";
import Typography from "./Typography";
import Card from "./Card";
import Tile from "./Tile";
import Carousel from "./Carousel";
import { useApiContext } from "../utils/context/ApiContext";
import { Forecast, TileForecast } from "../utils/types/forecast";
import { RecentSearch } from "../utils/types/api_context";

const WeatherCard: React.FC = React.memo(() => {
  const { data, selectedDay, setSelectedDay, recentSearches, showAllSearches, setShowAllSearches } = useApiContext();

  const weatherInfo = useMemo(() => {
    if (!data?.current?.data?.[0] || !data?.forecast?.data?.[0]) {
      return {
        temp: 0,
        high: 0,
        low: 0,
        description: '',
        icon: '',
      };
    }

    if (selectedDay) {
      const selectedForecast = data.forecast.data.find(
        (item: Forecast) => item.datetime === selectedDay
      );

      if (selectedForecast) {
        return {
          temp: Math.round(selectedForecast.temp),
          high: Math.round(selectedForecast.high_temp),
          low: Math.round(selectedForecast.low_temp),
          description: selectedForecast.weather.description,
          icon: selectedForecast.weather.icon,
        };
      }
    }

    const current = data.current.data[0];
    const forecast = data.forecast.data[0];

    return {
      temp: Math.round(current.temp),
      high: Math.round(forecast.high_temp),
      low: Math.round(forecast.low_temp),
      description: current.weather.description,
      icon: current.weather.icon,
    };
  }, [data, selectedDay]);

  const forecastData = useMemo(() => {
    if (!data?.forecast?.data) {
      return [];
    }

    // Skip today's forecast and get next 6 days
    return data.forecast.data.slice(1, 7).map((item: Forecast): TileForecast => ({
      day: item.datetime,
      temp: Math.round(item.temp),
      description: item.weather.description,
    }));
  }, [data]);

  const handleTileClick = (day: string) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  const handleSeeAllClick = () => {
    setShowAllSearches(!showAllSearches);
  };

  return (
    <Row>
      <Grid>
        <CurrentTemperature>
          <Typography fontWeight="300" fontSize="80px">
            {weatherInfo.temp}&deg;
          </Typography>
          <Row>
            <Pill>
              <Typography color="rgb(1, 50, 83)">H</Typography>
              <Typography>{weatherInfo.high}&deg;</Typography>
            </Pill>
            <Pill>
              <Typography color="rgb(1, 50, 83)">L</Typography>
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
        <Row>
          {weatherInfo.icon && (
            <WeatherIcon
              src={`https://cdn.weatherbit.io/static/img/icons/${weatherInfo.icon}.png`}
              alt={weatherInfo.description}
            />
          )}
          <Typography color="#d1d5db" fontWeight="400" fontSize="54px">
            {weatherInfo.description}
          </Typography>
        </Row>
        <Feature>
          <Row $gap={8}>
            <Grid>
              <Typography fontWeight="500">Recently Searched</Typography>
              <Link $disabled={!recentSearches?.length} onClick={handleSeeAllClick}>
                <Typography color={recentSearches?.length ? '#ddd' : '#6b7280'}>
                  {showAllSearches ? "Show less" : "See all"}{" "}
                  <IconWrapper $margin="5px 0 0 4px">
                    <ChevronRightIcon size={16} style={{
                      transform: showAllSearches ? 'rotate(-90deg)' : 'rotate(90deg)',
                      transition: 'transform 0.3s ease'
                    }} />
                  </IconWrapper>
                </Typography>
              </Link>
            </Grid>
            <CarouselContainer $withPadding={showAllSearches}>
              {recentSearches?.length > 0 ? (
                showAllSearches ? (
                  <CarouselWrapper>
                    <Carousel itemsPerPage={2}>
                      {recentSearches.map((search: RecentSearch) => (
                        <Card key={search.city} search={search} />
                      ))}
                    </Carousel>
                  </CarouselWrapper>
                ) : (
                  <CardGrid>
                    {recentSearches.slice(0, 2).map((search: RecentSearch) => (
                      <Card key={search.city} search={search} />
                    ))}
                  </CardGrid>
                )
              ) : (
                <Typography fontWeight="500">No recent searches</Typography>
              )}
            </CarouselContainer>
          </Row>
        </Feature>
      </Grid>
      <Fragment>
        <Typography fontWeight="500" fontSize="16px">
          Upcoming Forecast
        </Typography>
        <Grid>
          {forecastData.map((forecast: TileForecast) => (
            <Tile
              key={forecast.day}
              forecast={forecast}
              $isActive={selectedDay === forecast.day}
              onClick={() => handleTileClick(forecast.day)}
            />
          ))}
        </Grid>
      </Fragment>
    </Row>
  );
});

const Fragment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

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
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 4px 15px;
  width: 100px;
`;

const Feature = styled.div`
  width: 30%;
  position: relative;
`;

const CarouselContainer = styled.div<{ $withPadding: boolean }>`
  padding: ${props => props.$withPadding ? '0 40px' : '0'};
  width: 100%;
`;

const CarouselWrapper = styled.div`
  margin: 0 -40px;
  width: calc(100% + 80px);
`;

const Link = styled.div<{ $disabled?: boolean }>`
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$disabled ? 0.5 : 1};
  pointer-events: ${props => props.$disabled ? 'none' : 'auto'};
  background: transparent;
  border: none;
  padding: 4px 0px 4px 4px;
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
`;

const CardGrid = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  & > * {
    flex: 1;
    min-width: 0;
  }
`;

export default WeatherCard;

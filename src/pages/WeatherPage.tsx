import React, { useMemo } from "react";
import { styled } from "styled-components";
import clearSky from "../assets/clear_sky.jpg";
import brokenClouds from "../assets/broken_clouds.jpg";
import lightRain from "../assets/light_rain.jpg";
import snow from "../assets/snow.avif";
import defaultBg from "../assets/default.jpg";
import dramaticSky from "../assets/dramatic-sky.jpg";
import Sidebar from "../components/Sidebar";
import WeatherCard from "../components/WeatherCard";
import Header from "../components/Header";
import { MapPin as MapIcon } from "react-feather";
import Typography from "../components/Typography";
import { useApiContext } from "../utils/context/ApiContext";
import { Forecast } from "../utils/types/forecast";

const WeatherPage: React.FC = React.memo(() => {
  const { data, selectedDay } = useApiContext();

  const backgroundImage = useMemo(() => {
    if (!data?.current?.data?.[0]?.weather && !data?.forecast?.data) return defaultBg;

    let weatherDesc;
    if (selectedDay && data.forecast?.data) {
      const selectedForecast = data.forecast.data.find((day: Forecast) => day.datetime === selectedDay);
      weatherDesc = selectedForecast?.weather?.description?.toLowerCase() || '';
    } else {
      weatherDesc = data.current?.data?.[0]?.weather?.description?.toLowerCase() || '';
    }

    switch (true) {
      case weatherDesc.includes('clear'):
        return clearSky;
      case weatherDesc.includes('broken'):
        return brokenClouds;
      case weatherDesc.includes('rain'):
        return lightRain;
      case weatherDesc.includes('snow'):
        return snow;
      case weatherDesc.includes('storm') ||
        weatherDesc.includes('thunder') ||
        weatherDesc.includes('lightning') ||
        weatherDesc.includes('overcast'):
        return dramaticSky;
      default:
        return defaultBg;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.current?.data, data?.forecast?.data, selectedDay]);

  const locationInfo = useMemo(() => {
    if (!data?.current?.data?.[0]) {
      return {
        location: "Loading...",
        date: ""
      };
    }

    const currentData = data.current.data[0];
    let date;

    if (selectedDay) {
      date = new Date(selectedDay);
    } else {
      date = new Date();
    }

    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return {
      location: `${currentData.city_name}, ${currentData.country_code}`,
      date: `(${formattedDate})`
    };
  }, [data, selectedDay]);

  return (
    <Container $backgroundImage={backgroundImage}>
      <Overlay />
      <Sidebar />
      <Fragment>
        <Header />
        <HeadLiner>
          <IconWrapper>
            <MapIcon size={16} />
          </IconWrapper>
          <Typography fontSize="20px" fontWeight="500">
            {locationInfo.location}
          </Typography>
          <Typography fontWeight="300" fontSize="16px" color="#d1d5db">
            {locationInfo.date}
          </Typography>
        </HeadLiner>
        <WeatherCard />
      </Fragment>
    </Container>
  );
});

const Fragment = styled.div``;

const Container = styled.div<{ $backgroundImage: string }>`
  position: relative;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 3fr 9fr;
  padding: 35px 100px;
  gap: 32px;

  // Add an overlay using a pseudo-element
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(1, 50, 83, 0.4); // Semi-transparent black
    z-index: 1; // Ensures the overlay is on top of the background
  }

  // Make sure content appears above the overlay
  > * {
    position: relative;
    z-index: 2;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(1, 50, 83, 0.4);
  z-index: 1;
`;

const HeadLiner = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  gap: 8px;
`;

const IconWrapper = styled.div<{ $margin?: string }>`
  color: #9ca3af;
  margin: ${(props) => (props.$margin ? props.$margin : "0px")};
`;

export default WeatherPage;

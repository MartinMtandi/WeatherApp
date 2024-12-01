import React, { useMemo } from "react";
import { styled } from "styled-components";
import palmTrees from "../assets/dramatic-sky.jpg";
import Sidebar from "../components/Sidebar";
import WeatherCard from "../components/WeatherCard";
import Header from "../components/Header";
import { MapPin as MapIcon } from "react-feather";
import Typography from "../components/Typography";
import { useApiContext } from "../utils/context/ApiContext";

const WeatherPage: React.FC = React.memo(() => {
  const { data, selectedDay } = useApiContext();

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
    <Container>
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

const Container = styled.div`
  position: relative;
  background-image: url(${palmTrees});
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
    background-color: rgba(0, 0, 0, 0.6); // Semi-transparent black
    z-index: 1; // Ensures the overlay is on top of the background
  }

  // Make sure content appears above the overlay
  > * {
    position: relative;
    z-index: 2;
  }
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

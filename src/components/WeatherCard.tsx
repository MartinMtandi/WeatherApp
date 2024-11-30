import React from "react";
import { ChevronRight as ChevronRightIcon } from "react-feather";
import styled from "styled-components";
import Typography from "./Typography";
import Card from "./Card";
import Tile from "./Tile";
import forecast from "../utils/forecast.json";
import { Forecast } from "../utils/types/forecast";

const WeatherCard: React.FC = () => {
  return (
    <Row>
      <Grid>
        <CurrentTemperature>
          <Typography fontWeight="300" fontSize="80px">
            18&deg;
          </Typography>
          <Row>
            <Pill>
              <Typography color="#6b7280">H</Typography>
              <Typography>29&deg;</Typography>
            </Pill>
            <Pill>
              <Typography color="#6b7280">L</Typography>
              <Typography>11&deg;</Typography>
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
          Stormy with partly cloudy
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
        {forecast.map((f: Forecast) => (
          <Tile key={f.id} forecast={f} />
        ))}
      </Grid>
    </Row>
  );
};

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

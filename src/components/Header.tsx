import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "react-feather";
import Typography from "./Typography";
import { useApiContext } from "../utils/context/ApiContext";

const Header: React.FC = React.memo(() => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [city, setSearchCity] = useState<string>("");

  const { fetchData } = useApiContext();

  useEffect(() => {
    // Check session storage first
    const storedData = sessionStorage.getItem('weather_data');
    // Only fetch if no stored data
    if (!storedData) {
      fetchData("Wellington");
    }
  }, []);

  const handleSearchClick = useCallback(async () => {
    if (!expanded) {
      setExpanded(true); // Expand the input if not already expanded
    } else if (city.trim()) {
      await handleSearchSubmit(); // Submit the form only if the city is populated
      setExpanded(false); // Collapse after successful search
    }
  }, [expanded, city]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    // Prevent collapse if clicking the search button
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget?.getAttribute('data-action') === 'search') {
      return;
    }
    
    // Only collapse if the input is empty
    if (!city.trim()) {
      setExpanded(false);
      setSearchCity("");
    }
  }, [city]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback(async () => {
    if (city.trim()) {
      try {
        // fetchData will handle the caching logic
        await fetchData(city);
        setSearchCity(""); // Reset the input after successful submission
        setExpanded(false); // Collapse the search after successful submission
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  }, [city, fetchData]);

  const handleRedirect = useCallback(() => {
    const url =
      "https://play.google.com/store/apps/details?id=com.weather.forecast.weatherchannel&hl=en";
    window.open(url, "_blank");
  }, []);

  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <SearchContainer>
          <Search
            type="text"
            $expanded={expanded}
            value={city}
            placeholder={expanded ? "Search by city" : ""}
            onFocus={() => setExpanded(true)}
            onBlur={handleBlur}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              // Submit on Enter key press
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          {/* Click icon to either expand or submit */}
          <SearchIconWrapper 
            type="button" 
            onClick={handleSearchClick}
            data-action="search"
          >
            <SearchIcon size={16} />
          </SearchIconWrapper>
        </SearchContainer>
      </form>
      <Button onClick={handleRedirect}>
        <Typography>Download App</Typography>
      </Button>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;
`;

const Button = styled.button`
  color: #ddd;
  padding: 8px 18px;
  border: 1px solid #6b7280;
  border-radius: 16px;
  background: rgba(75, 85, 99, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: background 0.4s ease, border-radius 0.3s ease;

  &:hover {
    background: rgba(75, 85, 99, 0.3);
    border-radius: 10px;
  }
`;

const SearchIconWrapper = styled.button`
  position: absolute;
  right: 12px;
  color: #9ca3af;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 18px;
  transition: background 0.4s ease, border-radius 0.3s ease;

  &:hover {
    background: rgba(75, 85, 99, 0.3);
    border-radius: 10px;
    border: 1px solid #6b7280;
  }
`;

const Search = styled.input<{ $expanded: boolean }>`
  width: ${(props) => (props.$expanded ? "250px" : "36px")};
  height: 36px;
  border: none;
  border-radius: 18px;
  padding-right: 36px; /* Space for the icon on the right */
  padding-left: ${(props) => (props.$expanded ? "16px" : "3px")};
  background: rgba(75, 85, 99, 0.6);
  color: #ddd;
  font-size: 14px;
  outline: none;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    background: rgba(75, 85, 99, 0.3);
    border-radius: 10px;
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    cursor: text;
  }
`;

export default Header;

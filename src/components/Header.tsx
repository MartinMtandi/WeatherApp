import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Search as SearchIcon } from "react-feather";
import Typography from "./Typography";
import { useApiContext } from "../utils/context/ApiContext";
import { capitalizeWords } from "../utils/helpers/string";

const Header: React.FC = React.memo(() => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [city, setSearchCity] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

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
      setExpanded(true); 
    } else if (city.trim()) {
      await handleSearchSubmit(); 
      setExpanded(false); 
    }
  }, [expanded, city]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    // Prevent collapse if clicking the search button
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget?.getAttribute('data-action') === 'search') {
      return;
    }
    
    if (!city.trim()) {
      setExpanded(false);
      setSearchCity("");
    }
  }, [city]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCity(e.target.value);
    if (error) setError(false); 
  }, [error]);

  const handleSearchSubmit = useCallback(async () => {
    if (city.trim()) {
      const formattedCity = capitalizeWords(city.trim());
      try {
        await fetchData(formattedCity);
        setSearchCity(""); 
        setExpanded(false); 
        setError(false); 
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError(true); 
      }
    }
  }, [city, fetchData]);

  const handleRedirect = useCallback(() => {
    // If we had a download link for this app, we could use that
    const url =
      "https://play.google.com/store/apps/details?id=com.weather.forecast.weatherchannel&hl=en";
    window.open(url, "_blank");
  }, []);

  return (
    <Container>
      <form onSubmit={(e) => e.preventDefault()}>
        <SearchContainer $error={error}>
          <Search
            type="text"
            $expanded={expanded}
            $error={error}
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
            $error={error}
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
  border: 1px solid rgb(1, 50, 83);
  border-radius: 16px;
  background: rgb(1, 50, 83);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    border-radius: 10px;
    border: 1px solid #6b7280;
  }
`;

const SearchIconWrapper = styled.button<{ $error?: boolean }>`
  position: absolute;
  right: 12px;
  color: ${props => props.$error ? '#ef4444' : '#9ca3af'};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const SearchContainer = styled.div<{ $error?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.$error ? '#ef4444' : 'transparent'};
  border-radius: 18px;
  transition: all 0.4s ease;

  &:hover {
    background: rgba(1, 50, 83, 0.5);
    border-radius: 10px;
    border: 1px solid ${props => props.$error ? '#ef4444' : '#6b7280'};
  }
`;

const Search = styled.input<{ $expanded: boolean; $error?: boolean }>`
  width: ${(props) => (props.$expanded ? "250px" : "36px")};
  height: 36px;
  border: none;
  border-radius: 18px;
  padding-right: 36px; /* Space for the icon on the right */
  padding-left: ${(props) => (props.$expanded ? "16px" : "3px")};
  background: rgba(1, 50, 83, 0.5);
  color: ${props => props.$error ? '#ef4444' : '#ddd'};
  font-size: 14px;
  outline: none;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    background: rgba(75, 85, 99, 0.3);
    border-radius: 10px;
  }

  &::placeholder {
    color: ${props => props.$error ? '#ef4444' : '#9ca3af'};
  }

  &:focus {
    cursor: text;
  }
`;

export default Header;

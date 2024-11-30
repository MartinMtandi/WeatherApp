import React, { createContext, useState, useContext, useCallback, ReactNode, useEffect } from "react";
import { ApiContextType } from "../types/api_context";
import { ApiService } from "../../services/ApiService";

interface ApiProviderProps {
  children: ReactNode;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

const STORAGE_KEY = 'weather_data';

interface StoredData {
  city: string;
  data: Record<string, any>;
  timestamp: number;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [currentCity, setCurrentCity] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Load data from session storage on initial mount
  useEffect(() => {
    const storedData = sessionStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const { city, data: weatherData, timestamp }: StoredData = JSON.parse(storedData);
        const currentTime = new Date().getTime();
        
        // Check if the data is less than 30 minutes old
        if (currentTime - timestamp < 30 * 60 * 1000) {
          setData(weatherData);
          setCurrentCity(city);
          console.log('Loaded cached data for', city);
        } else {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
  }, []);

  const fetchData = useCallback(async (city: string) => {
    try {
      // Clear selected day when fetching new data
      setSelectedDay(null);

      // Check if we already have data for this city
      if (city.toLowerCase() === currentCity.toLowerCase()) {
        console.log('Using cached data for', city);
        return;
      }

      const responses = await ApiService.fetchAll(city);
      setData(responses);
      setCurrentCity(city);

      // Store in session storage
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          city,
          timestamp: new Date().getTime(),
          data: responses,
        })
      );
    } catch (error) {
      console.error("Error fetching API data:", error);
      throw error;
    }
  }, [currentCity]);

  const contextValue: ApiContextType = {
    data,
    selectedDay,
    setSelectedDay,
    fetchData
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};

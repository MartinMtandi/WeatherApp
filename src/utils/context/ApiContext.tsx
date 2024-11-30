import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ApiContextType } from "../types/api_context";
import { ApiService } from "../../services/ApiService";

const ApiContext = createContext<ApiContextType | undefined>(undefined);

const STORAGE_KEY = 'weather_data';

interface StoredData {
  city: string;
  data: Record<string, any>;
  timestamp: number;
}

type ApiProviderProps = {
  children: ReactNode;
};

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [data, setData] = useState<Record<string, any>>({});
  const [currentCity, setCurrentCity] = useState<string>("");

  // Load data from session storage on initial mount
  useEffect(() => {
    const storedData = sessionStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const { city, data: weatherData, timestamp }: StoredData = JSON.parse(storedData);
      
      // Check if data is less than 30 minutes old
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (now - timestamp < thirtyMinutes) {
        setData(weatherData);
        setCurrentCity(city);
      } else {
        // Clear expired data
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const fetchData = async (city: string) => {
    try {
      // Check if we already have data for this city
      if (city.toLowerCase() === currentCity.toLowerCase()) {
        console.log('Using cached data for', city);
        return;
      }

      // Fetch new data
      const responses = await ApiService.fetchAll(city);
      
      // Store in state and session storage
      setData(responses);
      setCurrentCity(city);
      
      const storageData: StoredData = {
        city,
        data: responses,
        timestamp: Date.now()
      };
      
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
    } catch (error) {
      console.error("Error fetching API data:", error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ data, fetchData }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};

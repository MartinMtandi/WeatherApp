import React, { createContext, useState, useContext, ReactNode } from "react";
import { ApiContextType } from "../types/api_context";
import { ApiService } from "../../services/ApiService";

const ApiContext = createContext<ApiContextType | undefined>(undefined);

type ApiProviderProps = {
  children: ReactNode;
};

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [data, setData] = useState<Record<string, any>>({});

  const fetchData = async (city: string) => {
    try {
      const responses = await ApiService.fetchAll(city); // Pass the city to the service
      setData(responses);
    } catch (error) {
      console.error("Error fetching API data:", error);
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

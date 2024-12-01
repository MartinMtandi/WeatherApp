export interface RecentSearch {
  city: string;
  temp: number;
  description: string;
  timestamp: number;
  icon: string;
}

export interface WeatherData {
  datetime?: string;
  temp?: number;
  wind_spd: number;
  wind_cdir: string;
  rh: number;
  uv: number;
  pres: number;
  dewpt?: number;
  weather?: {
    description: string;
    icon: string;
  };
}

export interface WeatherResponse {
  data: WeatherData[];
}

export interface ApiResponse {
  current?: WeatherResponse;
  forecast?: WeatherResponse;
}

export interface ApiContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
  fetchData: (city: string) => Promise<void>;
  recentSearches: RecentSearch[];
  showAllSearches: boolean;
  setShowAllSearches: (show: boolean) => void;
}

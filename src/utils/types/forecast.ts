export interface Forecast {
  datetime: string;
  temp: number;
  high_temp: number;
  low_temp: number;
  weather: {
    description: string;
    icon: string;
    code: number;
  };
}

export interface WeatherResponse {
  data: Forecast[];
  city_name: string;
  country_code: string;
}

export interface TileForecast {
  day: string;
  temp: number;
}

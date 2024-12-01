/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Sidebar from '../../src/components/Sidebar';
import React from 'react';

// Define the SquareProps type locally since it's not exported
type SquareType = 'wind' | 'humidity' | 'uv' | 'pressure';
interface SquareProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  type: SquareType;
}

// Mock the Square component
vi.mock('../../src/components/Square', () => ({
  default: ({ type, value, unit }: SquareProps) => (
    <div data-testid={`${type}-square`}>
      <span data-testid={`${type}-value`}>{value}</span>
      {unit && <span data-testid={`${type}-unit`}>{unit}</span>}
    </div>
  )
}));

const mockWeatherData = {
  current: {
    data: [{
      temp: 20,
      weather: {
        description: 'Clear sky',
        icon: '01d'
      },
      wind_spd: 5.2,
      wind_cdir: 'N',
      rh: 65,
      uv: 4,
      pres: 1015,
      datetime: '2024-01-20',
      dewpt: 12
    }],
    city_name: 'New York',
    country_code: 'US'
  },
  forecast: {
    data: [
      {
        datetime: '2024-01-20',
        temp: 18,
        weather: {
          description: 'Partly cloudy',
          icon: '02d'
        },
        wind_spd: 4.5,
        wind_cdir: 'NE',
        rh: 70,
        uv: 3,
        pres: 1012,
        dewpt: 10
      }
    ]
  }
};

const mockApiContext = {
  data: mockWeatherData,
  selectedDay: null,
  setSelectedDay: vi.fn(),
  fetchData: vi.fn(),
  recentSearches: [
    {
      city: 'New York',
      temp: 20,
      description: 'Clear sky',
      timestamp: Date.now(),
      icon: '01d'
    }
  ]
};

// Create a mock module for ApiContext
const mockUseApiContext = vi.fn(() => mockApiContext);

// Mock the ApiContext module
vi.mock('../../src/utils/context/ApiContext', async () => {
  const actual = await vi.importActual('../../src/utils/context/ApiContext');
  return {
    ...(actual as object),
    useApiContext: () => mockUseApiContext()
  };
});

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseApiContext.mockReturnValue(mockApiContext);
  });

  it('renders current weather information', () => {
    render(<Sidebar />);
    
    // Humidity
    const humidityValue = screen.getByTestId('humidity-value');
    const humidityUnit = screen.getByTestId('humidity-unit');
    expect(humidityValue).toHaveTextContent('65');
    expect(humidityUnit).toHaveTextContent('%');
    
    // Wind Speed (5.2 m/s * 3.6 = 18.72 km/h, rounded to 19)
    const windValue = screen.getByTestId('wind-value');
    const windUnit = screen.getByTestId('wind-unit');
    expect(windValue).toHaveTextContent('19');
    expect(windUnit).toHaveTextContent('km/h');
    
    // Pressure
    const pressureValue = screen.getByTestId('pressure-value');
    const pressureUnit = screen.getByTestId('pressure-unit');
    expect(pressureValue).toHaveTextContent('1015');
    expect(pressureUnit).toHaveTextContent('mBar');
  });

  it('renders forecast data when a day is selected', () => {
    mockUseApiContext.mockReturnValue({
      ...mockApiContext,
      selectedDay: '2024-01-20'
    });

    render(<Sidebar />);
    
    // Check forecast values
    expect(screen.getByTestId('humidity-value')).toHaveTextContent('70');
    expect(screen.getByTestId('wind-value')).toHaveTextContent('16'); // 4.5 m/s * 3.6 = 16.2 km/h, rounded to 16
    expect(screen.getByTestId('pressure-value')).toHaveTextContent('1012');
  });

  it('shows no data state', () => {
    mockUseApiContext.mockReturnValue({
      ...mockApiContext,
      data: null
    });

    render(<Sidebar />);
    
    // Check default values
    expect(screen.getByTestId('humidity-value')).toHaveTextContent('0');
    expect(screen.getByTestId('wind-value')).toHaveTextContent('0');
    expect(screen.getByTestId('pressure-value')).toHaveTextContent('0');
  });
});

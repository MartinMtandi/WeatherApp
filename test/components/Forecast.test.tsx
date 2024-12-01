import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../utils/test-utils';
import Forecast from '../../src/components/Forecast';
import { ApiResponse } from '../../src/utils/types/api_context';
import React from 'react';

const mockWeatherData: ApiResponse = {
  current: {
    data: [{
      temp: 20,
      datetime: '2024-01-20',
      wind_spd: 5.2,
      wind_cdir: 'NE',
      rh: 65,
      uv: 4.2,
      pres: 1015,
      weather: {
        description: 'Clear sky',
        icon: '01d'
      }
    }]
  },
  forecast: {
    data: [
      {
        datetime: '2024-01-20',
        temp: 18,
        wind_spd: 4.8,
        wind_cdir: 'NE',
        rh: 68,
        uv: 3.9,
        pres: 1014,
        weather: {
          description: 'Partly cloudy',
          icon: '02d'
        }
      },
      {
        datetime: '2024-01-21',
        temp: 20,
        wind_spd: 5.1,
        wind_cdir: 'N',
        rh: 62,
        uv: 4.5,
        pres: 1016,
        weather: {
          description: 'Clear sky',
          icon: '01d'
        }
      },
      {
        datetime: '2024-01-22',
        temp: 19,
        wind_spd: 4.9,
        wind_cdir: 'NW',
        rh: 70,
        uv: 3.8,
        pres: 1013,
        weather: {
          description: 'Light rain',
          icon: '10d'
        }
      }
    ]
  }
};

const mockSetSelectedDay = vi.fn();

const mockApiContext = {
  data: mockWeatherData,
  setSelectedDay: mockSetSelectedDay,
  selectedDay: '2024-01-20',
  fetchData: vi.fn(),
  recentSearches: [],
  showAllSearches: false,
  setShowAllSearches: vi.fn()
};

vi.mock('../../src/utils/context/ApiContext', () => ({
  useApiContext: () => mockApiContext,
  ApiProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('Forecast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders forecast items', () => {
    render(<Forecast />);
    expect(screen.getByText('18°')).toBeInTheDocument();
    expect(screen.getByText('20°')).toBeInTheDocument();
    expect(screen.getByText('19°')).toBeInTheDocument();
  });

  it('updates selected day on click', () => {
    render(<Forecast />);
    const forecastItem = screen.getByText('20°').closest('div');
    fireEvent.click(forecastItem!);
    expect(mockSetSelectedDay).toHaveBeenCalledWith('2024-01-21');
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import WeatherPage from '../../src/pages/WeatherPage';

// Mock the Sidebar component
vi.mock('../../src/components/Sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>
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
      datetime: '2024-01-20'
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
        pres: 1012
      }
    ]
  }
};

const mockApiContext = {
  data: mockWeatherData,
  selectedDay: '2024-01-20',
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
  ],
  showAllSearches: false,
  setShowAllSearches: vi.fn()
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

describe('WeatherPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseApiContext.mockReturnValue(mockApiContext);
  });

  it('renders current weather information', () => {
    render(<WeatherPage />);
    expect(screen.getByText('20°')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
  });

  it('renders Sidebar component', () => {
    render(<WeatherPage />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('shows loading state when no data', () => {
    mockUseApiContext.mockReturnValue({
      ...mockApiContext,
      data: null
    });

    render(<WeatherPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

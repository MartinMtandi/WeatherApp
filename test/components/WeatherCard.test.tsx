import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import WeatherCardStandalone from '../../src/components/WeatherCardStandalone';
import { Forecast } from '../../src/utils/types/forecast';

const mockWeatherData: Forecast = {
  datetime: '2024-01-20',
  temp: 18,
  high_temp: 20,
  low_temp: 15,
  weather: {
    description: 'Partly cloudy',
    icon: '02d'
  }
};

describe('WeatherCard', () => {
  it('renders weather information correctly', () => {
    render(<WeatherCardStandalone data={mockWeatherData} />);
    expect(screen.getByText('18°')).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
    expect(screen.getByAltText('weather icon')).toHaveAttribute(
      'src',
      `https://openweathermap.org/img/wn/02d@2x.png`
    );
  });

  it('formats date correctly', () => {
    render(<WeatherCardStandalone data={mockWeatherData} />);
    expect(screen.getByText('Jan 20')).toBeInTheDocument();
  });
});

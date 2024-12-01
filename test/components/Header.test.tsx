/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../utils/test-utils';
import Header from '../../src/components/Header';
import React from 'react';

const mockHandleSearch = vi.fn();

const mockApiContext = {
  handleSearch: mockHandleSearch,
  error: null,
  loading: false,
  data: {},
  selectedDay: null,
  setSelectedDay: vi.fn(),
  fetchData: vi.fn(),
  recentSearches: [],
  showAllSearches: false,
  setShowAllSearches: vi.fn()
};

vi.mock('../../src/utils/context/ApiContext', () => ({
  useApiContext: () => mockApiContext,
  ApiProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders download button with correct text based on screen size', () => {
    // Mock mobile viewport
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(max-width: 480px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }));

    render(<Header />);
    expect(screen.getByText('Get App')).toBeInTheDocument();

    // Mock desktop viewport
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }));

    render(<Header />);
    expect(screen.getByText('Download App')).toBeInTheDocument();
  });

  it('handles download button click', () => {
    const mockOpen = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<Header />);
    
    const downloadButton = screen.getByTestId('download-button');
    fireEvent.click(downloadButton);
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://play.google.com/store/apps/details?id=com.weather.forecast.weatherchannel&hl=en',
      '_blank'
    );
    mockOpen.mockRestore();
  });

  it('handles search button click', () => {
    render(<Header />);
    
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    
    // Check if search input is expanded
    const searchInput = screen.getByPlaceholderText('Search by city');
    expect(searchInput).toBeInTheDocument();
  });

  it('handles search input and submit', () => {
    render(<Header />);
    
    // Click search button to expand
    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);
    
    // Type in search input
    const searchInput = screen.getByPlaceholderText('Search by city');
    fireEvent.change(searchInput, { target: { value: 'London' } });
    
    // Click search button again to submit
    fireEvent.click(searchButton);
    
    // Verify fetchData was called with the city
    expect(mockApiContext.fetchData).toHaveBeenCalledWith('London');
  });
});

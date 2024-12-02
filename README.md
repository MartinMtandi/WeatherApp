# Weather App

A modern, responsive weather application built with React and TypeScript that allows users to search for and view weather information for different cities.

## Features

- 🔍 City weather search
- 🌡️ Current & Forecast temperature display
- 🎨 Clean, modern UI with styled-components
- 📱 Responsive design
- ✅ Comprehensive test coverage

## Tech Stack

- React 18
- TypeScript
- Vite
- Styled Components
- Vitest for unit testing
- React Testing Library
- ESLint for code quality

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:MartinMtandi/WeatherApp.git
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate test coverage report (The index file is available at coverage/index.html)
- `npm run test:watch` - Run tests in watch mode

## Design Decisions and Trade-offs

### Architecture
- Used Context API for global state management instead of Redux, as the app's complexity doesn't warrant a full state management library
- Implemented a custom API context to handle weather data fetching and caching
- Separated components into presentational and container components for better maintainability

### Styling
- Chose styled-components for component-level styling to maintain a clear connection between components and their styles
- Used a modular design system with consistent spacing and typography
- Used inbuilt CSS animations for smooth transitions instead of external libraries like react-spring or framer-motion which were overkill.

### Testing
- Implemented comprehensive unit tests using Vitest and React Testing Library
- Focused on testing user interactions and component integration rather than implementation details
- Used mock service worker (MSW) for API testing to avoid actual network calls during tests

### Performance
- Implemented debouncing for search input to reduce unnecessary API calls
- Used React.memo() selectively for components that receive stable props
- Optimized bundle size by using specific imports from large packages
- Implemented caching strategies:
  - Cached API responses for 30 minutes to reduce redundant network calls
  - Stored recently searched cities in session storage for quick access
- Image optimizations:
  - Preloading strategy: Preloaded all weather background images at component initialization to ensure they're available in the browser cache
  - Smooth transitions: Implemented a loading state with opacity transitions (0.5s ease-in-out) to prevent jarring image changes
  - Progressive loading: Used a two-step loading process where:
    1. A default background is shown immediately
    2. Weather-specific backgrounds are loaded and smoothly transitioned in
  - Memory optimization: Used useMemo for background selection logic to prevent unnecessary recalculations
  - Fallback handling: Implemented a default background for cases where weather data or image loading fails
  - Responsive design: Optimized background-size and position for different screen sizes using CSS properties

### Future Improvements
1. Add weather history functionality
2. Implement geolocation for automatic local weather
3. Add End to End testing using Playwright & CucumberJS
4. Implement PWA capabilities for offline access
5. Add weather alerts and notifications
6. Make use of Google Maps API for City name suggestions and validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

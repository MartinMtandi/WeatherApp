export const ApiService = {
    async fetchAll(city: string) {
      const apiConfig = {
        current: import.meta.env.VITE_CURRENT_API_BASE_URL,
        forecast: import.meta.env.VITE_FORECAST_API_BASE_URL
      };

      const apiKey = import.meta.env.VITE_API_KEY;
  
      const responses: Record<string, any> = {};
  
      await Promise.all(
        Object.entries(apiConfig).map(async ([alias, url]) => {
          try {
            const fullUrl = `${url}${encodeURIComponent(city)}&key=${apiKey}`;
            const response = await fetch(fullUrl);
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Failed to fetch ${alias}: ${response.status} ${response.statusText}\nResponse: ${errorText}`);
            }
            const data = await response.json();
            responses[alias] = data;
          } catch (error) {
            console.error(`Error fetching ${alias}:`, error);
            throw error;
          }
        })
      );
  
      return responses;
    },
  };
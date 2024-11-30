export interface ApiContextType {
  data: Record<string, any>;
  fetchData: (city: string) => Promise<void>;
}

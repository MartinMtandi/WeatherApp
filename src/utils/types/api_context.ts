export interface ApiContextType {
  data: Record<string, any>;
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
  fetchData: (city: string) => Promise<void>;
}

export interface RecentSearch {
  city: string;
  temp: number;
  description: string;
  timestamp: number;
  icon: string;
}

export interface ApiContextType {
  data: Record<string, any>;
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
  fetchData: (city: string) => Promise<void>;
  recentSearches: RecentSearch[];
  showAllSearches: boolean;
  setShowAllSearches: (show: boolean) => void;
}

import { toast } from "react-hot-toast";
import { create } from "zustand";

const useChartStore = create((set, get) => ({
  chartCategoryData: [],
  chartCategoryLoading: false,
  chartData: [],
  chartLoading: false,
  chartCategoryFilter: {},
  chartfilters: {},

  setchartCategoryFilter: (chartCategoryFilter) => {
    if (
      JSON.stringify(get().chartCategoryFilter) !==
      JSON.stringify(chartCategoryFilter)
    ) {
      set({ chartCategoryFilter });
      get().fetchChartCategory();
    }
  },

  fetchChartCategory: async () => {
    set({ chartCategoryLoading: true });

    try {
      const { chartCategoryFilter } = get();
      let query = new URLSearchParams(chartCategoryFilter).toString();
      query = query ? `?${query}` : "";

      const response = await fetch(
        `http://localhost:3000/api/expenses/category/chart${query}`,
        { credentials: "include" }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to fetch category data");

      set({ chartCategoryData: data, chartCategoryLoading: false });
    } catch (error) {
      set({ chartCategoryLoading: false });
      console.error(error.message);
      toast.error(error.message || "Something went wrong");
    }
  },

  setYmChartfilters: (chartfilters) => {
    if (JSON.stringify(get().chartfilters) !== JSON.stringify(chartfilters)) {
      set({ chartfilters });
      get().fetchYmChart();
    }
  },

  fetchYmChart: async () => {
    set({ chartLoading: true });

    try {
      const { chartfilters } = get();
      let query = new URLSearchParams(chartfilters).toString();
      query = query ? `?${query}` : "";

      const response = await fetch(
        `http://localhost:3000/api/expenses/ym/chart${query}`,
        { credentials: "include" }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to fetch monthly chart data");

      set({ chartData: data, chartLoading: false });
    } catch (error) {
      set({ chartLoading: false });
      console.error(error.message);
      toast.error(error.message || "Something went wrong");
    }
  },
}));

export default useChartStore;

// `http://localhost:3000/api/expenses/ym/chart${query}`,

import { toast } from "react-hot-toast";
import { create } from "zustand";

const useExpenseStore = create((set) => ({
  ExpensesData: [],
  loading: false,
  filters: {},

  setFilters: (filters) => {
    set({ filters });

    // console.log(filters);

    // ------------------------------------------------------------
    useExpenseStore.getState().fetchExpenses();
    //---------------------------------------------------
  },

  fetchExpenses: async () => {
    set({ loading: true });

    try {
      const { filters } = useExpenseStore.getState();
      let query = new URLSearchParams(filters).toString();
      query = query ? `?${query}` : "";

      // console.log(query);

      const response = await fetch(
        `http://localhost:3000/api/expenses${query}`,
        {
          credentials: "include",
        }
      );

      // const response = await fetch(`/api/expenses${query}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      set({ ExpensesData: data, loading: false });
    } catch (error) {
      set({ loading: false });
      setTimeout(() => {
        console.log(error.message);

        toast.error(error.message || "Something went wrong");
      }, 0);
    }
  },

  createExpense: async (category, amount, description) => {
    set({ loading: true });

    const updatedData = {};

    if (category) updatedData.category = category;
    if (amount) updatedData.amount = amount;
    if (description) updatedData.description = description;

    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || data.error || "Something went wrong");

      //---------------------------------------

      toast.success(`Expense added successfully!`);
      useExpenseStore.getState().fetchExpenses();

      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      setTimeout(() => {
        toast.error(error.message || "update failed");
      }, 0);
    }
  },

  updateExpense: async (id, category, amount, description) => {
    set({ loading: true });

    const updatedData = {};

    if (category) updatedData.category = category;
    if (amount) updatedData.amount = amount;
    updatedData.description = description;
    // console.log(description);
    // console.log(updatedData);

    try {
      const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || data.error || "Something went wrong");

      //---------------------------------------

      toast.success(`Expense updated successfully!`);

      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      setTimeout(() => {
        toast.error(error.message || "update failed");
      }, 0);
    }
  },

  deleteExpense: async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success(data.message || "Expense deleted successfully");
      set((state) => ({
        ExpensesData: state.ExpensesData.filter(
          (expense) => expense._id !== id
        ),
      }));
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  },
}));

export default useExpenseStore;

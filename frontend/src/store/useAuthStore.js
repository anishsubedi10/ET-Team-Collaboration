import { create } from "zustand";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  login: async (email, password) => {
    set({ loading: true });

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // mode: "cors",
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const user = await response.json();

      if (!response.ok) throw new Error(user.error || "Something went wrong");

      set({ user, loading: false });
      // setTimeout(() => {
      //   toast.success("Login successful! 🎉");
      // }, 0);
    } catch (error) {
      set({ loading: false });
      setTimeout(() => {
        toast.error(error.message || "Login failed");
      }, 0);
    }
  },

  signup: async (email, password, fullName) => {
    set({ loading: true });

    const updatedData = {};

    if (fullName) updatedData.fullName = fullName;
    if (email) updatedData.email = email;
    if (password) updatedData.password = password;

    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });
      const user = await response.json();

      if (!response.ok) throw new Error(user.error || "Something went wrong");
      set({ user, loading: false });
    } catch (error) {
      set({ loading: false });
      setTimeout(() => {
        toast.error(error.message || "Login failed");
      }, 0);
    }
  },

  logout: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      set({ user: null });
      toast.success(data.message || "Logged out successfully");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:3000/api/auth/getme", {
        credentials: "include",
      });

      if (res.status === 401) {
        set({ user: null, loading: false });
        return;
      }

      if (!res.ok) {
        throw new Error("Authentication check failed");
      }

      const user = await res.json();
      set({ user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));

export default useAuthStore;

import { create } from "zustand";
import { toast } from "react-hot-toast";

const useUserStore = create((set) => ({
  profileData: null,
  loading: false,

  profile: async () => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:3000/api/user/profile", {
        credentials: "include",
      });

      const profileData = await res.json();
      set({ profileData, loading: false });
    } catch {
      // set({ profileData: null, loading: false });
      set({ loading: false });
    }
  },

  updateProfile: async (fullName, email, currentPassword, newPassword) => {
    set({ loading: true });

    const updatedData = {};

    if (fullName) updatedData.fullName = fullName;
    if (email) updatedData.email = email;
    if (currentPassword) updatedData.currentPassword = currentPassword;
    if (newPassword) updatedData.newPassword = newPassword;

    try {
      const response = await fetch("http://localhost:3000/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      const profile = await response.json();

      if (!response.ok)
        throw new Error(profile.error || "Something went wrong");

      //---------------------------------------
      const updatedField = fullName
        ? "Name"
        : email
        ? "Email"
        : currentPassword
        ? "Password"
        : "";

      toast.success(`${updatedField} updated successfully!`);

      set({ profileData: profile, loading: false });
    } catch (error) {
      set({ loading: false });
      setTimeout(() => {
        toast.error(error.message || "update failed");
      }, 0);
    }
  },
}));

export default useUserStore;

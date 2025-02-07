import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./features/Home/Home";
import LayoutApp from "./ui/LayoutApp";
import Login from "./features/Login";
import Signup from "./features/SignUp";
import Profile from "./features/Profile";
import ExpenseChart from "./features/Chart";
import PageNotFound from "./ui/PageNotFound";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
import Loader from "./ui/Loader";

import { Toaster } from "react-hot-toast";

// import "./App.css";

function App() {
  const { user, loading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutApp />}>
          <Route index element={user ? <Home /> : <Navigate to="/login" />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          <Route
            path="/Profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/chart"
            element={user ? <ExpenseChart /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

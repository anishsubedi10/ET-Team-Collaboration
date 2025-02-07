import { Outlet } from "react-router-dom";
import Header from "./Header";
import LeftFixedItem from "./LeftFixedItem";
import Footer from "./Footer";
import AddItem from "./AddItem";
import useAuthStore from "../store/useAuthStore";

function LayoutApp() {
  const { user } = useAuthStore();

  return (
    <div className="mx-auto text-sm  box-border flex min-h-screen max-w-[1440px] flex-col bg-orange-50 text-yellow-900">
      <Header />
      {user && <LeftFixedItem />}
      {user && <AddItem />}
      <main className="flex-grow  ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LayoutApp;

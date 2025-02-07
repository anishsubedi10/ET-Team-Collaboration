import { NavLink } from "react-router-dom";

function LeftFixedItem() {
  return (
    // <div className="ml-1  p-2 py-3 bg-green-800 fixed top-[37%]  ">

    <div className="md:ml-1 p-2 py-3 bg-green-800 fixed md:top-[37%] top-[92%] md:w-fit w-full z-10">
      <ul className="text-white flex md:flex-col justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block p-2 mb-1 ${
              isActive ? "bg-green-950 font-bold" : "hover:bg-green-950"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/chart"
          className={({ isActive }) =>
            `block p-2 mb-1 ${
              isActive ? "bg-green-950 font-bold" : "hover:bg-green-950"
            }`
          }
        >
          Chart
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block p-2 ${
              isActive ? "bg-green-950 font-bold" : "hover:bg-green-950"
            }`
          }
        >
          My Profile
        </NavLink>
      </ul>
    </div>
  );
}

export default LeftFixedItem;

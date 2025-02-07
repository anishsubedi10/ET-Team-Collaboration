import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
// import { CiLight } from "react-icons/ci";
// import { CiDark } from "react-icons/ci";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/useAuthStore";

function Header() {
  const navigate = useNavigate();

  // ------------------------------------------------------
  const { user, logout } = useAuthStore();
  // ------------------------------------------------------

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const [background, setBackground] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  return (
    <div
      className={`py-2 ${user ? "pl-7" : "pl-[8%]"} pr-[10%] bg-orange-100`}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="flex justify-between items-center ">
        <li className="bg-green-800 rounded-full w-12 h-12 flex justify-center items-center">
          <Link to="/" className="text-2xl text-white">
            ET
          </Link>
        </li>

        <li className="flex gap-6 items-center ">
          <div className="relative group">
            <CgProfile
              className="text-2xl cursor-pointer  "
              aria-label="Profile"
              onClick={() => (user ? navigate("/Profile") : toggleDropdown())}
            />

            {!user && isDropdownOpen && (
              // <div className="absolute bg-white shadow-md rounded-md p-3 right-0 top-8 hidden group-hover:block">
              <div className="absolute bg-green-800 shadow-md rounded-md px-6 py-3 right-0 top-8 z-10 ">
                <Link
                  to="/login"
                  className="inline-block text-white hover:underline mb-1"
                  onClick={toggleDropdown}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-block text-white hover:underline  w-20"
                  onClick={toggleDropdown}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {user && (
            <div className="relative group flex text-red-600 hover:text-red-700">
              <button
                className="text-2xl text-red-600 hover:text-red-700 cursor-pointer"
                aria-label="Logout"
                onClick={() => logout()}
              >
                <IoIosLogOut />
              </button>
              <p className="absolute hidden top-8 left-[-0.5rem] group-hover:block text-xs">
                Logout
              </p>
            </div>
          )}

          {/* <button
            className="text-2xl  cursor-pointer transition-all duration-300 ease-in-out"
            aria-label="Logout"
            onClick={() => setBackground(!background)}
          >
            {background ? <CiDark /> : <CiLight className="text-black" />}
          </button> */}
        </li>
      </ul>
    </div>
  );
}

export default Header;

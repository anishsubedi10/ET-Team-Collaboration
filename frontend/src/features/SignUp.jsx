import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function Signup() {
  //------------------------------------------
  const { signup } = useAuthStore();
  //---------------------------------------------

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [forEmptyEmailError, setForEmptyEmailError] = useState("");
  const [forEmptypasswordError, setForEmptyPasswordError] = useState("");
  const [error, setError] = useState(""); //!!!!!!!!

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setForEmptyEmailError("Email is required.");
      if (!password) {
        setForEmptyPasswordError("password is required.");
      }
      return;
    }
    if (!password) {
      setForEmptyEmailError("");
      setForEmptyPasswordError("password is required.");
      return;
    }

    console.log("Form submitted with:", { email, password, name });
    setForEmptyEmailError("");
    setForEmptyPasswordError("");
    //-------------------------------------------
    signup(email, password, name);
    //-------------------------------------------
  };

  return (
    <div className=" flex items-center justify-center bg-orange-50 text-yellow-900 px-5 py-15">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
            Create an Account
          </h1>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block  mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block  mb-1">
              Email Address <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {forEmptyEmailError && (
            <div className="text-red-500 text-[0.75rem] mt-[-0.5rem] mb-4">
              {forEmptyEmailError}
            </div>
          )}

          <div className="mb-4 relative">
            <label htmlFor="password" className="block  mb-1">
              Password <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute bottom-3 cursor-pointer right-4  text-lg focus:outline-none"
            >
              {passwordVisible ? <BiHide /> : <BiShow />}
            </button>
          </div>
          {forEmptypasswordError && (
            <div className="text-red-500 text-[0.75rem] mt-[-0.5rem] mb-4">
              {forEmptypasswordError}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition duration-300 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?
            <Link
              to="/login"
              className="text-yellow-900 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

import { useState } from "react";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import useAuthStore from "../store/useAuthStore";

function Login() {
  //------------------------------------------
  const { login, user, loading } = useAuthStore();
  console.log(user);
  //---------------------------------------------

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [forEmptyEmailError, setForEmptyEmailError] = useState("");
  const [forEmptypasswordError, setForEmptyPasswordError] = useState("");
  const [error, setError] = useState(""); //!!!!!!!!

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

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

    // try {

    console.log("Form submitted with:", { email, password, name });
    setForEmptyEmailError("");
    setForEmptyPasswordError("");
    // } catch (error) {
    // setError("Error logging in. Please try again.");
    // } finally {
    // setLoading(false);
    // }

    //-------------------------------------------
    login(email, password);
    //-------------------------------------------
  };

  if (forgotPasswordOpen) {
    return <ForgotPassword setForgotPasswordOpen={setForgotPasswordOpen} />;
  }

  return (
    <div className=" flex items-center justify-center bg-orange-50 text-yellow-900 px-5 py-15">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
            Welcome Back!
          </h1>
        </div>

        <form onSubmit={handleFormSubmit}>
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
            <div className="text-red-500 text-[0.75rem] mt-[-0.5rem] mb-2">
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
              Login
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-900 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div
          className="mt-2 text-center cursor-pointer"
          onClick={() => setForgotPasswordOpen(true)}
        >
          <p className="text-yellow-900 font-semibold hover:underline">
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

//-!!!!!!!!!!!!!!!!!!!!!!!!!--------------Yaa ko error haru ma thi rakne

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { BiHide, BiShow } from "react-icons/bi";

// function Login() {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Both fields are required.");
//       return;
//     }

//     // You can add more validation like checking if the email is valid here
//     setLoading(true);
//     try {
//       // Simulate form submission logic (you can integrate with your backend here)
//       console.log("Form submitted with:", { email, password });
//       setError(""); // Clear any previous errors
//       // Redirect or show success message on successful login
//     } catch (error) {
//       setError("Error logging in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50 text-yellow-900">
//       <div className="w-[400px] bg-white shadow-lg rounded-lg p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
//             Welcome Back!
//           </h1>
//         </div>

//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block mb-1">
//               Email Address <span className="text-red-500 text-lg">*</span>
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-6 relative">
//             <label htmlFor="password" className="block mb-1">
//               Password <span className="text-red-500 text-lg">*</span>
//             </label>
//             <input
//               type={passwordVisible ? "text" : "password"}
//               id="password"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute bottom-3 cursor-pointer right-4 text-lg focus:outline-none"
//             >
//               {passwordVisible ? <BiHide /> : <BiShow />}
//             </button>
//           </div>

//           {/* Error message */}
//           {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition duration-300"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </div>
//         </form>

//         <div className="mt-4 text-center">
//           <p>
//             Don’t have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-yellow-900 font-semibold hover:underline"
//             >
//               Sign Up
//             </Link>
//           </p>
//         </div>

//         {/* Forgot Password Link */}
//         <div className="mt-4 text-center">
//           <Link
//             to="/forgot-password"
//             className="text-yellow-900 font-semibold hover:underline"
//           >
//             Forgot Password?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

// import { useState } from "react";
// import { Link } from "react-router-dom";

function ForgotPassword({ setForgotPasswordOpen }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    setError("");
  };

  return (
    <div className=" flex items-center justify-center bg-orange-50 text-yellow-900 px-5 py-15">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
            Forgot Password
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email Address <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-500 text-[0.75rem] mt-[-0.5rem] mb-4">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-600 transition duration-300"
              // disabled={loading}
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <div
          className="mt-4 text-center "
          onClick={() => setForgotPasswordOpen(false)}
        >
          <p>
            Remembered your password?{" "}
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

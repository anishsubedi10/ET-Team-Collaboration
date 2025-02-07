import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import Loader from "../ui/Loader";
import useAuthStore from "../store/useAuthStore";
import useUserStore from "../store/useUserStore";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

function Profile() {
  const { logout } = useAuthStore();
  const { profileData, loading, profile } = useUserStore();

  useEffect(() => {
    profile();
  }, []);

  const [showForm, setShowForm] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleToggleForm = (formType) => {
    setShowForm((prev) => {
      const updatedState = { ...prev, [formType]: !prev[formType] };
      document.body.style.overflow = updatedState[formType] ? "hidden" : "auto";
      return updatedState;
    });
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <div className=" bg-orange-50 text-yellow-900 flex flex-col items-center justify-center py-10 px-5 ">
      <div className="w-[97%] sm:w-[25rem]  bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
            My Profile
          </h1>
        </div>

        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="text-center mb-6">
            <div className=" flex items-center justify-center gap-4">
              <div className="mb-4">
                <img
                  src="favicon.ico"
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-500"
                />
              </div>
              <CiEdit className="text-lg cursor-pointer" />
            </div>

            {profileData?.fullName && (
              <div className=" flex items-center justify-center gap-4 ">
                <h2 className="text-xl font-semibold ">
                  {profileData?.fullName}
                </h2>
                <CiEdit
                  className="text-lg cursor-pointer"
                  onClick={() => handleToggleForm("name")}
                />
              </div>
            )}

            <div className=" flex items-center justify-center gap-4 ">
              <p className="text-sm text-gray-600">{profileData?.email}</p>
              <CiEdit
                className="text-lg cursor-pointer"
                onClick={() => handleToggleForm("email")}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => handleToggleForm("password")}
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 cursor-pointer"
          >
            Change password
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {showForm.name && <UpdateName handleToggleForm={handleToggleForm} />}
      {showForm.email && <UpdateEmail handleToggleForm={handleToggleForm} />}
      {showForm.password && (
        <UpdatePassword handleToggleForm={handleToggleForm} />
      )}
    </div>
  );
}

export default Profile;

// const ProfileUpdate = ({ handleUpdateFormToggle }) => {
//   const { profileData, updateProfile, profile } = useUserStore();

//   const [name, setName] = useState(profileData?.name || "");
//   const [email, setEmail] = useState(profileData?.email);

//   const [formName, setFormName] = useState("");
//   const [formEmail, setFormEmail] = useState("");
//   const [CurrentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");

//   const handleUpdateProfile = (e) => {
//     e.preventDefault();

//     // console.log(name.toLowerCase() === profileData.fullName?.toLowerCase());
//     // if (name.toLowerCase() === profileData.fullName?.toLowerCase()) setName("");

//     // console.log(email.toLowerCase() === profileData.email.toLowerCase());
//     // if (email.toLowerCase() === profileData.email.toLowerCase()) setEmail("");

//     updateProfile(
//       name === formName || formName === "" ? "" : formEmail,
//       email === formEmail || formEmail === "" ? "" : formEmail,
//       CurrentPassword,
//       newPassword
//     );

//     // handleUpdateFormToggle();

//     //----------------------------------
//     // profile();
//     //----------------------------------
//   };

//   return (
//     // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-5">
//     <div className="fixed inset-0  backdrop-blur-xs flex items-center justify-center z-50 px-5">
//       <div className="w-[400px] bg-white shadow-lg rounded-lg p-8 relative">
//         <button
//           onClick={handleUpdateFormToggle}
//           className="absolute top-2 right-2 text-gray-600 text-lg hover:text-gray-800 cursor-pointer"
//         >
//           {/* ✖ */}
//           <RxCross1 />
//         </button>

//         <div className="text-center mb-3">
//           <h2 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
//             Update Profile
//           </h2>
//           <p className="text-sm  mt-3">
//             You can update any one of the fields below
//           </p>
//         </div>

//         <form onSubmit={(e) => handleUpdateProfile(e)}>
//           <div className="mb-4">
//             <label htmlFor="fullName" className="block mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={name}
//               onChange={(e) => setFormName(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block  mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="currentPassword" className="block  mb-1">
//               Current Password
//             </label>
//             <input
//               type="password"
//               id="currentPassword"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               onChange={(e) => setCurrentPassword(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="newPassword" className="block  mb-1">
//               New Password
//             </label>
//             <input
//               type="password"
//               id="NewPassword"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="profileImage" className="block  mb-1">
//               Upload Profile Image
//             </label>
//             <input
//               type="file"
//               id="profileImage"
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//             />
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300 cursor-pointer"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const UpdateImage = () => {};

const UpdateName = ({ handleToggleForm }) => {
  const { profileData, updateProfile } = useUserStore();

  const [name, setName] = useState(profileData?.fullName || "");

  const handleUpdateName = (e) => {
    e.preventDefault();

    if (name && name.toLowerCase() !== profileData?.fullName?.toLowerCase()) {
      updateProfile(name, null, null, null);
    }

    handleToggleForm("name");
  };
  return (
    <div className="fixed inset-0  backdrop-blur-xs flex items-center justify-center z-50 px-5">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-8 relative">
        <button
          onClick={() => handleToggleForm("name")}
          className="absolute top-2 right-2 text-gray-600 text-lg hover:text-gray-800 cursor-pointer"
        >
          <RxCross1 />
        </button>

        <h2 className="text-xl text-center font-bold bg-green-800 text-white py-3 rounded-md">
          Update Name
        </h2>

        <form onSubmit={(e) => handleUpdateName(e)}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mt-3 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300 cursor-pointer"
            >
              Update Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateEmail = ({ handleToggleForm }) => {
  const { profileData, updateProfile } = useUserStore();

  const [email, setEmail] = useState(profileData?.email || "");

  const handleUpdateEmail = (e) => {
    e.preventDefault();

    if (email && email.toLowerCase() !== profileData?.email?.toLowerCase()) {
      updateProfile(null, email, null, null);
    }
    handleToggleForm("email");
  };
  return (
    <div className="fixed inset-0  backdrop-blur-xs flex items-center justify-center z-50 px-5">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-8 relative">
        <button
          onClick={() => handleToggleForm("email")}
          className="absolute top-2 right-2 text-gray-600 text-lg hover:text-gray-800 cursor-pointer"
        >
          <RxCross1 />
        </button>

        <div className="text-center mb-3">
          <h2 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
            Update Email
          </h2>
        </div>

        <form onSubmit={(e) => handleUpdateEmail(e)}>
          <div className="mb-4">
            <label htmlFor="email" className="block  mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300 cursor-pointer"
            >
              Update Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdatePassword = ({ handleToggleForm }) => {
  const { updateProfile } = useUserStore();

  const [CurrentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (CurrentPassword && newPassword) {
      updateProfile(null, null, CurrentPassword, newPassword);
      handleToggleForm("password");
    } else {
      toast.error("Insert both fields");
    }
  };
  return (
    <div className="fixed inset-0  backdrop-blur-xs flex items-center justify-center z-50 px-5">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-8 relative">
        <button
          onClick={() => handleToggleForm("password")}
          className="absolute top-2 right-2 text-gray-600 text-lg hover:text-gray-800 cursor-pointer"
        >
          <RxCross1 />
        </button>

        <div className="text-center mb-3">
          <h2 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
            Change Password
          </h2>
        </div>

        <form onSubmit={(e) => handleUpdatePassword(e)}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block  mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block  mb-1">
              New Password
            </label>
            <input
              type="password"
              id="NewPassword"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300 cursor-pointer"
            >
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

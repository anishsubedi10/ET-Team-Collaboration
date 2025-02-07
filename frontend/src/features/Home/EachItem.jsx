import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { PiDotsThreeVertical } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import UpdateForm from "./UpdateForm";
import useExpenseStore from "../../store/useExpenseStore";
// import Receipt from "./Recept";

function EachItem({ data, index }) {
  const { deleteExpense } = useExpenseStore();

  const [threeDotOpen, setThreeDotOpen] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdateFormToggle = () => {
    setShowUpdateForm(!showUpdateForm);
    if (showUpdateForm) {
      setThreeDotOpen(null);
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <div className="py-4 border-b relative border-gray-200 hover:bg-gray-50 transition-all duration-300">
        <ul
          className={`flex items-center gap-10  ${
            data.description ? "" : "min-h-16"
          }  `}
        >
          <li className="sm:w-40 w-[33%] text-gray-800 font-semibold pl-1">
            {index + 1}.{" "}
            {data.category.charAt(0).toUpperCase() +
              data.category.slice(1).toLowerCase()}
          </li>
          <li className="sm:w-32 w-[33%] text-center text-gray-800 ">
            {data.amount}
          </li>
          <li
            className={`w-80 hidden sm:block ${
              data.description ? "text-justify" : "text-center text-gray-600"
            }`}
          >
            {data.description
              ? data.description.charAt(0).toUpperCase() +
                data.description.slice(1).toLowerCase()
              : "--"}
          </li>
          <li className="w-16 text-center ">
            {!(threeDotOpen === index) && (
              <PiDotsThreeVertical
                className="cursor-pointer size-5 text-gray-600 hover:text-gray-800 absolute top-[50%] right-3 sm:relative"
                onClick={() => setThreeDotOpen(index)}
              />
            )}
            {threeDotOpen === index && (
              <nav className="flex gap-3  flex-col sm:flex-row absolute top-[10%]   right-3 sm:relative">
                <div className="relative group">
                  <CiEdit
                    className="cursor-pointer size-4 text-yellow-500 hover:text-yellow-600"
                    onClick={() => handleUpdateFormToggle()}
                  />
                  <p className="text-[10px] absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-green-800 text-white rounded-md px-1 py-0.5">
                    Edit
                  </p>
                </div>

                <div className="relative group">
                  <MdDeleteOutline
                    className="cursor-pointer size-4 text-red-600 hover:text-red-700"
                    onClick={() => deleteExpense(data._id)}
                  />
                  <p className="text-[10px] absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 text-white rounded-md px-1 py-0.5">
                    Delete
                  </p>
                </div>

                <div className="relative group">
                  <RxCross1
                    className="cursor-pointer size-4 text-gray-600 hover:text-gray-800"
                    onClick={() => setThreeDotOpen(null)}
                  />
                  <p className="text-[10px] absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white rounded-md px-1 py-0.5">
                    Close
                  </p>
                </div>
              </nav>
            )}
          </li>
        </ul>

        <p
          className={`mt-3 pl-4 w-[80%] sm:hidden  ${
            data.description
              ? "text-justify"
              : "text-center text-gray-600 hidden sm:block"
          }`}
        >
          {data.description
            ? data.description.charAt(0).toUpperCase() +
              data.description.slice(1).toLowerCase()
            : "--"}
        </p>

        {showUpdateForm && (
          <UpdateForm
            data={data}
            handleUpdateFormToggle={handleUpdateFormToggle}
          />
        )}
      </div>
      {/* // ------------------------------------------------------- */}
      {/* <Receipt /> */}
      {/* // ------------------------------------------------------- */}
    </>
  );
}

export default EachItem;

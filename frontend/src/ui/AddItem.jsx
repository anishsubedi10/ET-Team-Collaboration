import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import useExpenseStore from "../store/useExpenseStore";

function AddItem() {
  const { createExpense } = useExpenseStore();

  const [showForm, setShowForm] = useState(false);

  const [addData, setAddData] = useState({});
  const [emptyCategory, setEmptyCategory] = useState("");
  const [emptyAmount, setEmptyAmount] = useState("");

  const handleToggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!addData.category) {
      setEmptyCategory("Category is required");
      if (!addData.Amount) {
        setEmptyAmount("Amount is required");
      }
      return;
    }
    if (!addData.Amount) {
      setEmptyCategory("");
      setEmptyAmount("Amount is required");
      return;
    }
    createExpense(
      addData.category,
      addData.Amount,
      addData.Description || null
    );
    setEmptyAmount("");
    setEmptyCategory("");

    setAddData({});
    handleToggleForm();
  };
  return (
    <>
      <div
        className="fixed md:bottom-15 bottom-20 md:right-10 right-5 bg-green-800 p-2 rounded-full cursor-pointer group z-20 "
        onClick={handleToggleForm}
      >
        <IoIosAdd className="text-3xl text-white" />
        <p className="fixed hidden text-[10px]  mt-3 ml-[-0.5rem] group-hover:block text-green-800">
          Add Item
        </p>
      </div>

      {showForm && (
        <div className="fixed inset-0 backdrop-blur-xs  flex items-center justify-center z-50 px-5 py-5">
          <div className="w-[400px] bg-white shadow-lg rounded-lg p-8 relative">
            <button
              onClick={handleToggleForm}
              className="absolute top-1 right-1 text-gray-600 text-lg hover:bg-red-700 hover:text-white p-1 cursor-pointer"
            >
              <RxCross1 />
            </button>

            <div className="text-center mb-5">
              <h2 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
                Items Addition Form
              </h2>
            </div>

            <form onSubmit={handleSubmitForm}>
              <div className="mb-4">
                <label htmlFor="category" className="block  mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  // value={data.category}
                  onChange={(e) =>
                    setAddData((prevData) => ({
                      ...prevData,
                      category: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              {emptyCategory && (
                <div className="text-red-500 text-[0.75rem] mt-[-0.5rem] mb-4">
                  {emptyCategory}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="amount" className="block  mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  // value={data.amount}
                  onChange={(e) =>
                    setAddData((prevData) => ({
                      ...prevData,
                      Amount: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              {emptyAmount && (
                <div className="text-red-500 text-[0.75rem] mt-[-0.5rem] mb-4">
                  {emptyAmount}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="description" className="block  mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  onChange={(e) =>
                    setAddData((prevData) => ({
                      ...prevData,
                      Description: e.target.value,
                    }))
                  }
                  // value={data.description}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-green-800 text-white font-semibold py-2 px-6 rounded-md hover:bg-green-900 transition duration-300 cursor-pointer"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddItem;

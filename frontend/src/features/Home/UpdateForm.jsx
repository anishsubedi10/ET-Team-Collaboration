import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import useExpenseStore from "../../store/useExpenseStore";
import toast from "react-hot-toast";

function UpdateForm({ data, handleUpdateFormToggle }) {
  const { updateExpense } = useExpenseStore();
  const [formData, setFormData] = useState({
    category: data?.category || "",
    amount: data?.amount || "",
    description: data?.description || "",
  });
  function handleUpdateData(e) {
    e.preventDefault();

    const categoryChanged = formData.category !== data.category; //same false different true
    const amountChanged = formData.amount !== data.amount;
    const descriptionChanged = formData.description !== data.description;

    if (!categoryChanged && !amountChanged && !descriptionChanged) {
      toast.error("No changes detected. Please update at least one field.");
      return;
    }

    if (!formData.category || !formData.amount) {
      toast.error("Category and amount cannot be empty.");
      return;
    }

    updateExpense(
      data._id,
      categoryChanged ? formData.category : null,
      amountChanged ? formData.amount : null,
      descriptionChanged ? formData.description : null
    );

    handleUpdateFormToggle();
  }

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="fixed inset-0 backdrop-blur-xs  flex items-center justify-center z-50">
      <div className="w-[400px] bg-white shadow-lg rounded-lg p-8 relative">
        <button
          onClick={() => handleUpdateFormToggle()}
          className="absolute top-1 right-1 text-gray-600 text-lg hover:bg-red-700 hover:text-white p-1 cursor-pointer"
        >
          <RxCross1 />
        </button>

        <div className="text-center mb-3">
          <h2 className="text-xl font-bold bg-green-800 text-white py-3 rounded-md">
            Update Item
          </h2>
        </div>

        <form onSubmit={(e) => handleUpdateData(e)}>
          <div className="mb-4">
            <label htmlFor="category" className="block  mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block  mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block  mb-1">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-yellow-600 transition duration-300 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;

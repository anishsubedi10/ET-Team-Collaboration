import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import EachItem from "./EachItem";
import Loader from "../../ui/Loader";
import useExpenseStore from "../../store/useExpenseStore";
import Receipt from "./Recept";

function Items({ getExpenseFormat }) {
  //-------------------------------------------------
  const { ExpensesData, loading } = useExpenseStore();
  //-------------------------------------------------

  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredExpenses =
    selectedCategory === "all"
      ? ExpensesData
      : ExpensesData?.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="sm:w-[80%] sm:px-0 px-5 py-2  mx-auto  md:pl-[4rem]">
      <div className="flex sm:items-center  justify-between mb-6  ">
        <div className="text-[1.4rem] font-semibold flex flex-col sm:flex-row  gap-1 ">
          {/* <div className="text-[1.4rem] font-semibold flex flex-wrap justify-around gap-1"> */}
          <h1 className="text-yellow-800 whitespace-nowrap">Expenses for</h1>
          <p className="text-green-600 break-words text-center">
            {/* {getExpenseFormat()} */}
            {getExpenseFormat}
          </p>
        </div>

        <div className="flex flex-col items-center ">
          <CiFilter className="size-6" />
          {/* <p className="text-[9px] mt- ">Filter By category</p> */}

          <select
            className="mt-1 border rounded-md p-[0.2rem]"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option
              value="all"
              className="bg-green-800 text-white cursor-pointer"
            >
              All Categories
            </option>

            {Array.from(
              new Set(ExpensesData?.map((data) => data.category.toLowerCase()))
            ).map((category, index) => (
              <option
                key={index}
                value={category}
                className="bg-green-800 text-white"
              >
                {category.charAt(0).toUpperCase() +
                  category.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="flex items-center gap-10 py-2 text-lg font-medium text-gray-700 border-b border-gray-300">
        <li className="sm:w-40 w-[33%]">Category</li>
        <li className="sm:w-32 text-center w-[33%] ">Amount</li>
        <li className="w-80 hidden sm:block ">Description</li>
        <li className="w-16 text-center hidden sm:block">Actions</li>
      </ul>

      {loading ? (
        <Loader />
      ) : filteredExpenses.length > 0 ? (
        filteredExpenses?.map((data, index) => (
          <EachItem data={data} key={index} index={index} />
        ))
      ) : (
        <p className="mt-6 text-red-600">No expenses found.</p>
      )}

      {filteredExpenses.length > 0 && (
        <Receipt data={ExpensesData} getExpenseFormat={getExpenseFormat} />
      )}
    </div>
  );
}

export default Items;

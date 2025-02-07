import { useState } from "react";
import Items from "./Items";
import useExpenseStore from "../../store/useExpenseStore";
import Select from "../../ui/Select";

function Home() {
  const [expenseFormat, setExpenseFormat] = useState("");

  // --------------------------------------------------
  const { setFilters } = useExpenseStore();

  //-----------------------------------------------------

  return (
    <>
      <div className="w-fit mx-auto my-7 text-lg">
        <Select setFilters={setFilters} setExpenseFormat={setExpenseFormat} />
      </div>
      <Items getExpenseFormat={expenseFormat} />
    </>
  );
}

export default Home;

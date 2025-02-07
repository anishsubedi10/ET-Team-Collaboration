import { useState, useMemo, useEffect } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import {
  format,
  addDays,
  subDays,
  addMonths,
  subMonths,
  addYears,
  subYears,
} from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
// import useExpenseStore from "../../store/useExpenseStore";

function Select({
  setFilters,
  setExpenseFormat = "",
  DM = ["year", "day", "month"],
}) {
  const [selected, setSelected] = useState(DM[1] || DM[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  //--------------------------------------------------------

  useEffect(() => {
    if (setFilters) setFilters({ [selected]: getExpenseFormat() });
    //----------------------------------------
    if (setExpenseFormat) setExpenseFormat(getExpenseFormat());
    // -----------------------------
  }, [selected, currentDate, setExpenseFormat, setFilters]);

  //-------------------------------------------------------

  const getCalendarView = () => {
    if (selected === "day") return { view: "month", detail: "month" };
    if (selected === "month") return { view: "year", detail: "year" };
    return { view: "decade", detail: "decade" };
  };

  const { view, detail } = getCalendarView();

  const handleDateChange = (date) => {
    if (getExpenseFormat(date) <= getExpenseFormat(new Date())) {
      setCurrentDate(date);
      setCalendarVisible(false);
    } else {
      toast.error("Please select today or an earlier date.");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (DM.length > 2) {
        if (e.key === "ArrowLeft") handleLeftClick();
        if (e.key === "ArrowRight") handleRightClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentDate]);

  const handleLeftClick = () => {
    setCurrentDate((prevDate) => {
      if (selected === "day") return subDays(prevDate, 1);
      if (selected === "month") return subMonths(prevDate, 1);
      return subYears(prevDate, 1);
    });
  };

  const handleRightClick = () => {
    if (getExpenseFormat() < getExpenseFormat(new Date())) {
      setCurrentDate((prevDate) => {
        if (selected === "day") return addDays(prevDate, 1);
        if (selected === "month") return addMonths(prevDate, 1);
        return addYears(prevDate, 1);
      });
    }
  };

  const CalendarComponent = useMemo(
    () => (
      <Calendar
        onChange={handleDateChange}
        value={currentDate}
        view={view}
        maxDetail={detail}
        minDetail={detail}
      />
    ),
    [currentDate, view, detail]
  );

  const getExpenseFormat = (pro) => {
    const date = pro || currentDate;

    return selected === "day"
      ? format(date, "yyyy-MM-dd")
      : selected === "month"
      ? format(date, "yyyy-MM")
      : format(date, "yyyy");
  };
  return (
    <>
      <div className="relative flex flex-col items-center">
        {/* <ul className="flex gap-2 text-lg"> */}
        <ul className="flex gap-2 ">
          {/* {["year", "day", "month"].map((type) => ( */}
          {DM.map((type) => (
            <li
              key={type}
              className={`py-1 px-2 cursor-pointer ${
                selected === type ? "bg-green-800 text-white" : ""
              } hover:bg-green-800 hover:text-white`}
              onClick={() => {
                setCalendarVisible((prev) =>
                  selected === type ? !prev : true
                );
                setSelected(type);
              }}
              aria-label={`Select ${type} mode`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </li>
          ))}
        </ul>

        {/* <ul className="flex items-center w-fit mx-auto pt-3  text-lg gap-4"> */}
        <ul className="flex items-center w-fit mx-auto pt-3   gap-4">
          <MdOutlineKeyboardArrowLeft
            className="cursor-pointer text-"
            onClick={handleLeftClick}
            aria-label="Previous"
          />
          <span>{getExpenseFormat()}</span>

          <MdKeyboardArrowRight
            className={` text- ${
              getExpenseFormat() < getExpenseFormat(new Date())
                ? "cursor-pointer"
                : "cursor-not-allowed"
            }`}
            onClick={
              getExpenseFormat() < getExpenseFormat(new Date())
                ? handleRightClick
                : undefined
            }
            // onClick={handleRightClick}
            aria-label="Next"
          />
        </ul>

        {isCalendarVisible && (
          <div className="absolute top-20 z-10 bg-white border border-gray-200 shadow-md p-2 rounded-lg">
            {CalendarComponent}
          </div>
        )}
      </div>
    </>
  );
}

export default Select;

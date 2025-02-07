import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import Select from "../ui/Select";
import useChartStore from "../store/useChartStore";

// const expensesData = [
//   { category: "Lunch", amount: 50 },
//   { category: "Snacks", amount: 30 },
//   { category: "Transport", amount: 200 },
//   { category: "Groceries", amount: 100 },
//   { category: "Entertainment", amount: 50 },
//   { category: "Rent", amount: 3000 },
//   { category: "Electricity", amount: 200 },
// ];

// const monthlyExpenses = [
//   { month: "Jan", amount: 500 },
//   { month: "Feb", amount: 450 },
//   { month: "Mar", amount: 600 },
//   { month: "Apr", amount: 550 },
//   { month: "May", amount: 700 },
//   { month: "Jun", amount: 650 },
//   { month: "Jul", amount: 720 },
//   { month: "Aug", amount: 680 },
//   { month: "Sep", amount: 690 },
//   { month: "Oct", amount: 730 },
//   { month: "Nov", amount: 750 },
//   { month: "Dec", amount: 770 },
// ];

const COLORS = [
  "#FFA500",
  "#FF6347",
  "#FFD700",
  "#90EE90",
  "#ADD8E6",
  "#9370DB",
  "#FF69B4",
];

export default function ExpenseChart() {
  const {
    setchartCategoryFilter,
    setYmChartfilters,
    chartCategoryData,
    chartCategoryLoading,
    chartData,
    chartLoading,
  } = useChartStore();

  const [chartSize, setChartSize] = useState({
    width: 250,
    outerRadius: 70,
    barWidth: 250,
  });

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 640) {
        setChartSize({ width: 400, outerRadius: 120, barWidth: 600 });
      } else {
        setChartSize({ width: 250, outerRadius: 70, barWidth: 300 });
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 text-yellow-900 p-8 flex flex-col items-center">
      {/* <Select setFilters={setFilters} setExpenseFormat={setExpenseFormat} /> */}

      <div className="text-center mb-6">
        <h1 className="text-xl font-bold bg-green-800 text-white py-3 px-6 rounded-md inline-block">
          Expense Tracker Charts
        </h1>
      </div>

      <div className="w-full max-w-[700px] mb-8 bg-white shadow-lg rounded-lg p-6">
        <div className="w-fit mx-auto ">
          <h2 className="text-lg font-semibold text-center mb-4">
            Expense by Category
          </h2>

          <div className="my-4">
            <Select
              DM={["year", "month"]}
              setFilters={setchartCategoryFilter}
            />
          </div>

          {chartCategoryData.length ? (
            <PieChart width={chartSize.width} height={300}>
              <Pie
                // data={expensesData}
                data={chartCategoryData}
                // dataKey="amount"
                dataKey="totalAmount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={chartSize.outerRadius}
                fill="#8884d8"
                label
              >
                {/* {expensesData.map((entry, index) => ( */}
                {chartCategoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <p className="h-[18.75rem] mt-5">
              No expenses found for this period.
            </p>
          )}
        </div>
      </div>

      <div className="w-full max-w-[700px] bg-white shadow-lg rounded-lg p-6">
        <div className="w-fit mx-auto ">
          <h2 className="text-lg font-semibold text-center mb-4">
            Monthly Expense Trends
          </h2>
          <div className="my-4">
            <Select DM={["year"]} setFilters={setYmChartfilters} />
          </div>
          <BarChart
            width={chartSize.barWidth}
            height={300}
            // data={monthlyExpenses}
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#FFA500" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

const mongoose = require("mongoose");
const Expenses = require("../models/expense.model");

const addExpenses = async (req, res) => {
  try {
    const userId = req.user._id;
    const { category, amount, description } = req.body;

    if (!category && !amount) {
      return res
        .status(400)
        .json({ message: "Category and amount is required" });
    }
    const newExpense = new Expenses({ userId, category, amount, description });
    await newExpense.save();
    // res.status(200).json({ userId, category, amount, description });
    res.status(200).json(newExpense);
  } catch (error) {
    console.log("Error in postExpenses control", error);
    res.status(500).json({ error: "Server error" });
  }
};

const allExpenses = async (req, res) => {
  try {
    const userId = req.user._id;

    const { day, month, year, category } = req.query;
    const filter = { userId };

    if (category) filter.category = category;

    if (day) {
      const startOfDay = new Date(day);
      const endOfDay = new Date(day);
      endOfDay.setDate(startOfDay.getDate() + 1);
      filter.createdAt = { $gte: startOfDay, $lt: endOfDay };
    } else if (month) {
      const startOfMonth = new Date(`${month}-01`);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1);
      filter.createdAt = { $gte: startOfMonth, $lt: endOfMonth };
    } else if (year) {
      const startOfYear = new Date(`${year}-01-01`);
      const endOfYear = new Date(startOfYear);
      endOfYear.setFullYear(startOfYear.getFullYear() + 1);
      filter.createdAt = { $gte: startOfYear, $lt: endOfYear };
    }
    console.log(filter);

    const expenses = await Expenses.find(filter).sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    console.log("Error in allExpenses control", error);

    res.status(500).json({ error: "Server error" });
  }
};

const aExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Expense ID format" });
    }

    const expense = await Expenses.findOne({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("Error in aExpense controller:", error);

    res.status(500).json({ error: "Server error" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { category, amount, description } = req.body;

    console.log(description === "");

    if (!category && !amount && !description && !description === "") {
      return res
        .status(400)
        .json({ message: "At least one value is required to update" });
    }

    const expense = await Expenses.findOne({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (category) expense.category = category;
    if (amount) expense.amount = amount;
    if (description || description === "") expense.description = description;

    await expense.save();

    res.status(200).json(expense);
  } catch (error) {
    console.error("Error in updateExpense controller:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const expense = await Expenses.findOne({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await Expenses.deleteOne({ _id: id, userId });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error in deleteExpense controller:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const categoryChart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { month, year } = req.query;

    const filter = { userId };

    if (month) {
      const startOfMonth = new Date(`${year}-${month}-01`);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1);
      filter.createdAt = { $gte: startOfMonth, $lt: endOfMonth };
    } else if (year) {
      const startOfYear = new Date(`${year}-01-01`);
      const endOfYear = new Date(startOfYear);
      endOfYear.setFullYear(startOfYear.getFullYear() + 1);
      filter.createdAt = { $gte: startOfYear, $lt: endOfYear };
    }

    const expenses = await Expenses.find(filter).sort({ createdAt: -1 });

    const categoryData = expenses.reduce((acc, expense) => {
      const category = expense.category.toLowerCase();
      const amount = expense.amount;

      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});

    const categoryChartData = Object.keys(categoryData).map((category) => ({
      category,
      totalAmount: categoryData[category],
    }));

    res.status(200).json(categoryChartData);
  } catch (error) {
    console.log("Error in categoryChart control", error);
    res.status(500).json({ error: "Server error" });
  }
};

const chart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { year } = req.query;

    if (!year) {
      return res.status(400).json({ error: "Year is required" });
    }

    const startOfYear = new Date(`${year}-01-01`);
    const endOfYear = new Date(startOfYear);
    endOfYear.setFullYear(startOfYear.getFullYear() + 1);

    const filter = {
      userId,
      createdAt: { $gte: startOfYear, $lt: endOfYear },
    };

    const expenses = await Expenses.find(filter).sort({ createdAt: 1 });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyData = Array(12).fill(0);

    expenses.forEach((expense) => {
      const monthIndex = new Date(expense.createdAt).getMonth();
      monthlyData[monthIndex] += expense.amount;
    });

    const formattedData = monthlyData.map((totalAmount, index) => ({
      month: monthNames[index],
      amount: totalAmount,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    console.log("Error in chart Controller", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  allExpenses,
  addExpenses,
  aExpense,
  updateExpense,
  deleteExpense,
  categoryChart,
  chart,
};

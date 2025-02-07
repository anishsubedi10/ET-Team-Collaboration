const express = require("express");
const {
  allExpenses,
  addExpenses,
  aExpense,
  updateExpense,
  deleteExpense,
  categoryChart,
  chart,
} = require("../controllers/expenses.controller");
const protectRoute = require("../middleware/protecteRoute");

const router = express.Router();

router.get("/", protectRoute, allExpenses);
router.post("/", protectRoute, addExpenses);
router.get("/:id", protectRoute, aExpense);
router.patch("/:id", protectRoute, updateExpense);
router.delete("/:id", protectRoute, deleteExpense);

router.get("/category/chart", protectRoute, categoryChart);
router.get("/ym/chart", protectRoute, chart);

module.exports = router;

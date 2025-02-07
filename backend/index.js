const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const expenseRoutes = require("./routes/expense.route");

const DbConnect = require("./db/mongoDbConnection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

//-------------------------------------
// app.use(cors()); // Allow frontend requests

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with  frontend URL
    credentials: true, // Allow cookies
  })
);
//-------------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  DbConnect();
  console.log(`server started at port ${PORT}`);
});

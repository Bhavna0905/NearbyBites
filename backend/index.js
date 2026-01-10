require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const resRoutes = require("./routes/resRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 THIS LINE IS MANDATORY
connectDB();

app.use("/api", resRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Backend running" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on port 5000");
});

const express = require("express");
const cors = require("cors");

const resRoutes = require("./routes/resRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", resRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

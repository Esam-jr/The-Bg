const express = require("express");
const cors = require("cors");

const app = express();

const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postRoute");

app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");

connectDB();

app.use("/api", authRoute);
app.use("/api", postRoute);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

//user-password = 97Y47Bo0TmI2HNBa

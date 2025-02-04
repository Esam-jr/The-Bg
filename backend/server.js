import express, { json } from "express";
import cors from "cors";

const app = express();

import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";

app.use(cors());
app.use(json());

import connectDB from "./config/db.js";

connectDB();

app.use("/api/auth", authRoute);
app.use("/api", postRoute);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

//user-password = 97Y47Bo0TmI2HNBa

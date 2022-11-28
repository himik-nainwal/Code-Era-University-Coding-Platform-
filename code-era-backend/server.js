if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");

const rootRouter = require("./api/routers");
const connectDB = require("./utils/connectDB");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);

app.all("*", (req, res, next) => {
  res.send("Invalid Route");
});

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});

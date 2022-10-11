const express = require("express");
const app = express();
const cors = require("cors");
const rootRouter = require("./api/routers");

const PORT = process.env.PORT || 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", rootRouter);

app.all("*", (req, res, next) => {
  res.send("Gand mara bdwe");
});

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});

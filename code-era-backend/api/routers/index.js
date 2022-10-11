const rootRouter = require("express").Router();

const authRouter = require("./auth.router");

rootRouter.use("/auth", authRouter);

module.exports = rootRouter;

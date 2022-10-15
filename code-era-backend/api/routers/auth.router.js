const router = require("express").Router();
const { schemas, validateBody} = require ("../../utils/SchemaValidator");
const authRouter = require("../controllers/auth");

router.get("/", authRouter.login).post("/register",validateBody(schemas.userSchema),authRouter.register);


module.exports = router;

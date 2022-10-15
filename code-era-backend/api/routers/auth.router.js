const router = require("express").Router();
const { schemas, validateBody} = require ("../../utils/SchemaValidator");
const authRouter = require("../controllers/auth");

router.post("/",validateBody(schemas.userLoginSchema),authRouter.login).
post("/register",validateBody(schemas.userRegisterSchema),authRouter.register);


module.exports = router;

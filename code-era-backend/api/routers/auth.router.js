const router = require("express").Router();

const authRouter = require("../controllers/auth");

router.get("/", authRouter.login);
router.get("/register", authRouter.signup);

module.exports = router;

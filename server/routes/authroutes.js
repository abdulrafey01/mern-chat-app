const { Router } = require("express");
const { signup, login, fetchAll } = require("../controllers/authcontrollers");
const {
  signupValidator,
  loginValidator,
} = require("../validators/authvalidators");
const { runValidation } = require("../validators/index");

const { requireLogIn } = require("../middlewares/authmiddleware");

const router = Router();

router.post("/signup", signupValidator, runValidation, signup);

router.post("/login", loginValidator, runValidation, login);

router.get("/users", fetchAll);

module.exports = router;

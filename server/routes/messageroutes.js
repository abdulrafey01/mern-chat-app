const { Router } = require("express");
const { create } = require("../controllers/messagecontrollers");

const router = Router();

router.post("/create", create);

module.exports = router;

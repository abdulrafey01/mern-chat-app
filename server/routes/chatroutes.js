const { Router } = require("express");
const {
  create,
  fetchAll,
  deleteOne,
} = require("../controllers/chatcontrollers");

const router = Router();

router.post("/create", create);

router.get("/all/:id", fetchAll);

router.delete("/delete/:id", deleteOne);

module.exports = router;

// değişiklik yapmayın
const router = require("express").Router();
const bilmeceler = require("./bilmeceler-data");
const AuthCheck = require("../middleware/restricted");

router.get("/", AuthCheck, (req, res) => {
  res.status(200).json(bilmeceler);
});

module.exports = router;

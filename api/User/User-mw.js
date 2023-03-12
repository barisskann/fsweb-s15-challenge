const User = require("./User-model");

async function checkUsernameHaveDataRegister(req, res, next) {
  const data = await User.getByFilterUser({
    username: req.body.username,
  }).first();
  if (data) {
    return res.status(400).json({ message: "email kayıtlıdır" });
  } else {
    next();
  }
}

async function UsernamePasswordhaveBody(req, res, next) {
  if (!req.body.username || !req.body.password || req.body.username === "") {
    return res.status(400).json({ message: "bos alan bırakmayınız." });
  } else next();
}
async function checkUsernameHaveDataLogin(req, res, next) {
  const data = await User.getByFilterUser({
    username: req.body.username,
  }).first();
  if (!data) {
    return res.status(400).json({ message: "gecersiz kriterler" });
  } else {
    req.data = data;
    next();
  }
}

module.exports = {
  checkUsernameHaveDataLogin,
  UsernamePasswordhaveBody,
  checkUsernameHaveDataRegister,
};

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "ssh";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "Auth girişi bulunamamıştır" });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: "token süresi dolmus" });
    } else {
      req.user = decoded;
      next();
    }
  });
  /*
    EKLEYİN

    1- Authorization headerında geçerli token varsa, sıradakini çağırın.

    2- Authorization headerında token yoksa,
      response body şu mesajı içermelidir: "token gereklidir".

    3- Authorization headerında geçersiz veya timeout olmuş token varsa,
	  response body şu mesajı içermelidir: "token geçersizdir".
  */
};

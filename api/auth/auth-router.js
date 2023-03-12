const router = require("express").Router();
const usermw = require("../User/User-mw");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../User/User-model");
const JWT_SECRET = process.env.JWT_SECRET || "ssh";

router.post(
  "/register",
  usermw.UsernamePasswordhaveBody,
  usermw.checkUsernameHaveDataRegister,
  async (req, res, next) => {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 8);
    const addUser = await User.insertUser({
      username: req.body.username,
      password: hash,
    });
    return res.status(200).json(addUser);
    /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.
    2^8 HASH TURUNU AŞMAYIN!

    1- Yeni bir hesap kaydetmek için istemci "kullanıcı adı" ve "şifre" sağlamalıdır:
      {
        "username": "Captain Marvel", // `users` tablosunda var olmalıdır
        "password": "foobar"          // kaydedilmeden hashlenmelidir
      }

    2- BAŞARILI kayıtta,
      response body `id`, `username` ve `password` içermelidir:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- Request bodyde `username` ya da `password` yoksa BAŞARISIZ kayıtta,
      response body şunu içermelidir: "username ve şifre gereklidir".

    4- Kullanıcı adı alınmışsa BAŞARISIZ kayıtta,
      şu mesajı içermelidir: "username alınmış".
  */
  }
);

router.post(
  "/login",
  usermw.UsernamePasswordhaveBody,
  usermw.checkUsernameHaveDataLogin,
  async (req, res) => {
    const { password } = req.body;
    const comparePassword = await bcrypt.compare(password, req.data.password);
    if (comparePassword) {
      const token = jwt.sign(req.data, JWT_SECRET, { expiresIn: "1d" });
      return res
        .status(200)
        .json({ token, message: `welcome ${req.data.username}` });
    } else {
      return res.status({ message: "geçersiz kriterler" });
    }
    /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.

    1- Var olan bir kullanıcı giriş yapabilmek için bir `username` ve `password` sağlamalıdır:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- BAŞARILI girişte,
      response body `message` ve `token` içermelidir:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- req body de `username` ya da `password` yoksa BAŞARISIZ giriş,
      şu mesajı içermelidir: "username ve password gereklidir".

    4- "username" db de yoksa ya da "password" yanlışsa BAŞARISIZ giriş,
      şu mesajı içermelidir: "geçersiz kriterler".
  */
  }
);

module.exports = router;

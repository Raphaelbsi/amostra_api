require("dotenv").config();
const secret = process.env.JWT_TOKEN;

const jwt = require("jsonwebtoken");

const Usuario = require("../../app/models/usuario");

const withAuth = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token)
    res.status(401).json({ error: "Unauthorized: no token provided" });
  else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).json({ error: "Unauthorized: token invalid" });
      else {
        req.email = decoded.email;
        Usuario.findOne({ email: decoded.email })
          .then((usuario) => {
            req.usuario = usuario;
            next();
          })
          .catch((err) => {
            res.status(401).json({ error: err });
          });
      }
    });
  }
};

module.exports = withAuth;
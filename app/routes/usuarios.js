var express = require("express");
var router = express.Router();
const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_TOKEN;

router.post("/registrar", async (req, res) => {
  const { nome, email, password, altura, idade, sexo } = req.body;
  const usuario = new Usuario({ nome, email, password, altura, idade, sexo });

  try {
    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao Registrar o Usuário" });
  }
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) res.status(401).json({ error: "Email ou Senha incorreto" });
    else {
      usuario.isCorrectPassword(password, function (err, same) {
        if (!same) res.status(401).json({ error: "Email ou Senha incorreto" });
        else {
          const token = jwt.sign({ email }, secret, { expiresIn: "10d" });
          res.json({ usuario: usuario, token: token });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: " Erro interno, por favor tente novamente" });
  }
});

module.exports = router;

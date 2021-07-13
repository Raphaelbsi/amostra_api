var express = require("express");
var router = express.Router();

const Usuario = require("../models/usuarios");

router.post("/registrar", async (req, res) => {
  const { nome, email, password } = req.body;
  const usuario = new Usuario({ nome, email, password });

  try {
    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao Registrar o Usuário" });
  }
});

module.exports = router;

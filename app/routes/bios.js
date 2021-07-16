var express = require("express");
var router = express.Router();
const Bio = require("../models/bio");
const withAuth = require("../../src/middlewares/auth");

router.post("/", withAuth, async (req, res) => {
  const {
    pesoCoporal,
    percentGordura,
    percentMusculo,
    imc,
    metaBasal,
    idadeCorporal,
    gorduraVisceral,
    nivelGordura,
    nivelImc,
    nivelVisceral,
  } = req.body;

  try {
    let bio = new Bio({
      pesoCoporal: pesoCoporal,
      percentGordura: percentGordura,
      percentMusculo: percentMusculo,
      imc: imc,
      metaBasal: metaBasal,
      idadeCorporal: idadeCorporal,
      gorduraVisceral: gorduraVisceral,
      nivelGordura: nivelGordura,
      nivelImc: nivelImc,
      nivelVisceral: nivelVisceral,
      owner: req.usuario._id,
    });
    await bio.save();
    res.status(200).json(bio);
  } catch (error) {
    res.status(500).json("Problema ao adicionar sua Bioimpedância");
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let bio = await Bio.findById(id);
    if (isOwner(req.usuario, bio)) res.json(bio);
    else {
      res.status(403).json({ error: "Você não pode acessar essa Bioimpedância" });
    }
  } catch (error) {
    res.status(500).json({ error: "Problema ao encontrar sua Bioimpedância" });
  }
});
const isOwner = (usuario, bio) => {
  if (JSON.stringify(usuario._id) == JSON.stringify(bio.owner._id)) return true;
  else return false;
};
module.exports = router;

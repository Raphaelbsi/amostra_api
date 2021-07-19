var express = require("express");
var router = express.Router();
const Bio = require("../models/bio");
const withAuth = require("../../src/middlewares/auth");

router.post("/", withAuth, async (req, res) => {
  const {
    pesoCorporal,
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
      pesoCorporal: pesoCorporal,
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
router.get("/", withAuth, async (req, res) => {
  try {
    let bios = await Bio.find({ owner: req.usuario._id });
    res.json(bios).status(200);
  } catch (error) {
    res.json({ error: error }).status(500);
  }
});
router.get("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let bio = await Bio.findById(id);
    if (isOwner(req.usuario, bio)) res.json(bio);
    else {
      res
        .status(403)
        .json({ error: "Você não pode acessar essa Bioimpedância" });
    }
  } catch (error) {
    res.status(500).json({ error: "Problema ao encontrar sua Bioimpedância" });
  }
});
const isOwner = (usuario, bio) => {
  if (JSON.stringify(usuario._id) == JSON.stringify(bio.owner._id)) return true;
  else return false;
};

router.put("/:id", withAuth, async (req, res) => {
  const {
    pesoCorporal,
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
  const { id } = req.params;
  try {
    let bio = await Bio.findById(id);
    if (isOwner(req.usuario, bio)) {
      let bio = await Bio.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            pesoCorporal: pesoCorporal,
            percentGordura: percentGordura,
            percentMusculo: percentMusculo,
            imc: imc,
            metaBasal: metaBasal,
            idadeCorporal: idadeCorporal,
            gorduraVisceral: gorduraVisceral,
            nivelGordura: nivelGordura,
            nivelImc: nivelImc,
            nivelVisceral: nivelVisceral,
          },
        },
        { upsert: true, new: true }
      );
      res.json(bio);
    } else {
      res.status(403).json({ error: "Permissão negada!" });
    }
    
  } catch (error) {
    res.status(500).json({ error: "Problema ao atualizar a Bio" });
  }
});
module.exports = router;

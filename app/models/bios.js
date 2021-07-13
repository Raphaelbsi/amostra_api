const mongoose = require('mongoose');


let bioSchema = new mongoose.Schema({
    pesoCoporal: Number,
    percentGordura: Number,
    percentMusculo: Number,
    imc: Number,
    metaBasal: Number,
    idadeCorporal: Number,
    gorduraVisceral: Number,
    nivelGordura: String,
    nivelImc: String,
    nivelVisceral: String,
    altura: Number,
    idade: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

module.exports = mongoose.model('Bio', bioSchema);
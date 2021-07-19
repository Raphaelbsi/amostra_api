const mongoose = require('mongoose');


let bioSchema = new mongoose.Schema({
    pesoCorporal: Number,
    percentGordura: Number,
    percentMusculo: Number,
    imc: Number,
    metaBasal: Number,
    idadeCorporal: Number,
    gorduraVisceral: Number,
    nivelGordura: String,
    nivelImc: String,
    nivelVisceral: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

module.exports = mongoose.model('Bio', bioSchema);
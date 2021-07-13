const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    nome: String,
    email: { String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Usuario', usuarioSchema);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let usuarioSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  altura: Number,
  idade: Number,
  sexo: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

usuarioSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) next(err);
      else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});

usuarioSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) callback(err);
    else callback(err, same);
  });
};

module.exports = mongoose.model("Usuario", usuarioSchema);

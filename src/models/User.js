const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    whatsapp: {
      type: String
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function(next) {
  // criptografa a senha antes de salvar no bd
  if (!this.isModified("password")) {
    // se pass não foi modificado
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
});

// cria um method comparar a senha informada pelo usuario com a senha cryptografada do bd
UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

UserSchema.statics = {
  //craia um token para o usuário
  generateToken({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl // um periodo para que esse token inspire
    });
  }
};

module.exports = model("User", UserSchema);

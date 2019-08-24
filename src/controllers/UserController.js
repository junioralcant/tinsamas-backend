const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedUser = await User.findById(user);
    const users = await User.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } }
      ]
    });

    return res.json(users);
  },

  async store(req, res) {
    const { name, email, bio } = req.body;
    const { filename: avatar } = req.file;

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({
        error: "E-mail inválido, endereço de e-mail já cadrastrado"
      });
    }
    const user = await User.create({
      name,
      email,
      bio,
      avatar
    });
    return res.json(user);
  }
};

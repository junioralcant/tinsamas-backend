const User = require("../models/User");
module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { id } = req.params;

    const loggedUser = await User.findById(user);
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(400).json({
        error: "Usuário não existe"
      });
    }
    // Verifica se o user que vai raceber o like deu like no user logado
    if (targetUser.likes.includes(loggedUser._id)) {
      console.log("DEU MATCH");
    }
    loggedUser.likes.push(targetUser._id);

    await loggedUser.save();

    return res.json(loggedUser);
  }
};

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

    loggedUser.dislikes.push(targetUser._id);

    await loggedUser.save();

    return res.json(loggedUser);
  }
};

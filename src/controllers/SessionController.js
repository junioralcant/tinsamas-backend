const User = require("../models/User");

module.exports = {
  async store(req, resp) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }); // recebe o email existende no bd, que no caso é unico

    if (!user) {
      // se diferente de user, ou seja, se ele nao existir
      return resp.status(400).json({ error: "Usuário não existe" });
    }

    if (!(await user.compareHash(password))) {
      // se as senhas forem diferentes
      return resp.status(400).json({ error: "Senha inválida" });
    }

    return resp.json({ user, token: User.generateToken(user) });
  }
};

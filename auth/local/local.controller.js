const { getUserByUsername, findOneUser } = require('../../api/user/user.service');
const { signToken } = require('../auth.service');

const handlerLoginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const token = signToken(user.profile);
    return res.status(200).json({ userId: user._id, token: token });
};

const handlerVerifyAccount = async (req, res) => {
    const { hash } = req.params;
    try {
      const user = await findOneUser({ passwordResetToken: hash });

      if (!user) {
        return res.status(404).json({ message: 'Invalid Token' });
      }

      if (Date.now() > user.passwordResetExpires) {
        return res.status(400).json({ message: 'Token expired' });
      }

      user.active = true;
      user.passwordResetToken = null;
      user.passwordResetExpires = null;

      await user.save();
      const token = signToken(user.profile);

      return res.status(200).json({ userId: user._id, token: token });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    handlerLoginUser,
    handlerVerifyAccount,
};

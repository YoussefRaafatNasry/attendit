const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = {
  createUser: async ({ userInput }) => {
    try {
      const existingUser = await User.findOne({ email: userInput.email });
      if (existingUser) throw new Error("User already exists.");

      const hashedPassword = await bcrypt.hash(userInput.password, 12);

      const user = new User({
        email: userInput.email,
        password: hashedPassword
      });

      const result = await user.save();
      return { ...result._doc, _id: user.id, password: "***" };
    } catch (err) {
      return console.log(err);
    }
  },
  login: async ({ userInput }) => {
    const user = await User.findOne({ email: userInput.email });
    if (!user) throw new Error("Invalid email.");

    const isCorrect = await bcrypt.compare(userInput.password, user.password);
    if (!isCorrect) throw new Error("Invalid password.");

    const expiresIn = 60;
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.PRIVATE_KEY,
      { expiresIn: `${expiresIn}m` }
    );

    return {
      userId: user.id,
      token,
      expiresIn
    };
  }
};

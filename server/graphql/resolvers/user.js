const bcrypt = require("bcryptjs");
const User = require("../../models/user");

module.exports = {
  createUser: async ({ userInput }) => {
    try {
      const existingUser = await User.findOne({ email: userInput.email });
      if (existingUser) return Error("User already exists.");

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
  }
};

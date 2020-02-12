import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import User from "../../models/user";

interface UserInputType {
  email: string;
  password: string;
}

export const resolvers = {
  createUser: async ({ userInput }: { userInput: UserInputType }) => {
    try {
      const existingUser = await User.findOne({ email: userInput.email });
      if (existingUser) throw new Error("User already exists.");

      const hashedPassword = await bcrypt.hash(userInput.password, 12);

      const user = new User({
        email: userInput.email,
        password: hashedPassword
      });

      const result = await user.save();
      return { ...result.toObject(), _id: user.id, password: "***" };
    } catch (err) {
      throw new Error(err);
    }
  },
  login: async ({ userInput }: { userInput: UserInputType }) => {
    const user = await User.findOne({ email: userInput.email });
    if (!user) throw new Error("Invalid email.");

    const isCorrect = await bcrypt.compare(userInput.password, user.password);
    if (!isCorrect) throw new Error("Invalid password.");

    const expiresIn = 60;
    const token = jwt.sign({ userId: user.id }, process.env.PRIVATE_KEY!, {
      expiresIn: `${expiresIn}m`
    });

    return {
      userId: user.id,
      token,
      expiresIn
    };
  }
};

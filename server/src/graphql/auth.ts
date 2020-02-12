import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { gql, ApolloError } from "apollo-server";
import { AuthMetaData } from "../middleware/auth";
import User, { IUser } from "../models/user";

export const typeDef = gql`
  type AuthData {
    userId: ID!
    token: String!
    expiresIn: Int!
  }

  extend type Query {
    login(email: String!, password: String!): AuthData
  }

  extend type Mutation {
    register(email: String!, password: String!): User
  }
`;

export const resolvers = {
  Query: {
    login: async (_: any, { email, password }: IUser) => {
      const user = await User.findOne({ email });
      if (!user) throw new ApolloError("Invalid email.");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new ApolloError("Invalid password.");

      const meta: AuthMetaData = { userId: user.id };
      const privateKey = process.env.PRIVATE_KEY!;
      const expiresIn = 60;
      const token = jwt.sign(meta, privateKey, { expiresIn: `${expiresIn}m` });

      return { ...meta, token, expiresIn };
    }
  },
  Mutation: {
    register: async (_: any, { email, password }: IUser) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new ApolloError("User already exists.");
      const hashedPassword = await bcrypt.hash(password, 12);
      return User.create({ email, password: hashedPassword });
    }
  }
};

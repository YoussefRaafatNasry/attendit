import { gql } from "apollo-server";
import Event from "../models/event";
import { IUser } from "../models/user";

export const typeDef = gql`
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }
`;

export const resolvers = {
  User: {
    async createdEvents(user: IUser) {
      return await Event.find({ _id: { $in: user.createdEvents } });
    }
  }
};

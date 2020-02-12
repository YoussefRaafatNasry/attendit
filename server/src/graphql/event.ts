import { gql } from "apollo-server";
import { AuthMetaData } from "../middleware/auth";
import Event, { IEvent } from "../models/event";
import User from "../models/user";

export const typeDef = gql`
  type Event {
    _id: ID!
    title: String!
    description: String
    price: Float!
    date: DateTime!
    creator: User!
  }

  extend type Query {
    events: [Event!]!
  }

  extend type Mutation {
    createEvent(
      title: String!
      description: String
      price: Float!
      date: DateTime!
    ): Event
  }
`;

export const resolvers = {
  Event: {
    async creator(event: IEvent) {
      return await User.findById(event.creator);
    }
  },
  Query: {
    events: async () => {
      return await Event.find();
    }
  },
  Mutation: {
    createEvent: async (_: any, args: IEvent, { userId }: AuthMetaData) => {
      const event = await Event.create({
        ...args,
        creator: userId
      });

      await User.updateOne(
        { _id: userId },
        { $push: { createdEvents: event.id } }
      );

      return event;
    }
  }
};

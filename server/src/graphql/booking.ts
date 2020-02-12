import { gql } from "apollo-server";
import { AuthMetaData } from "../middleware/auth";
import User from "../models/user";
import Event from "../models/event";
import Booking, { IBooking } from "../models/booking";

export const typeDef = gql`
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    bookings: [Booking!]!
  }

  extend type Mutation {
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }
`;

export const resolvers = {
  Booking: {
    async event(booking: IBooking) {
      return await Event.findById(booking.event);
    },
    async user(booking: IBooking) {
      return await User.findById(booking.user);
    }
  },
  Query: {
    bookings: async () => {
      return await Booking.find();
    }
  },
  Mutation: {
    bookEvent: async (
      _: any,
      { eventId }: { eventId: string },
      { userId }: AuthMetaData
    ) => {
      return await Booking.create({ user: userId, event: eventId });
    },
    cancelBooking: async (_: any, { bookingId }: { bookingId: string }) => {
      const result = await Booking.findByIdAndDelete(bookingId);
      return await Event.findById(result?.event);
    }
  }
};

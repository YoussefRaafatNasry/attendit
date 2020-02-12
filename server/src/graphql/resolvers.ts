import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server";
import { GraphQLScalarType } from "graphql";
import { AuthMetaData } from "../middleware/auth";
import User, { IUser } from "../models/user";
import Event, { IEvent } from "../models/event";
import Booking, { IBooking } from "../models/booking";

const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime custom scalar type",
    parseValue(value) {
      return new Date(value).toISOString();
    },
    serialize(value) {
      return value.toISOString();
    }
  }),
  User: {
    async createdEvents(user: IUser) {
      return await Event.find({ _id: { $in: user.createdEvents } });
    }
  },
  Event: {
    async creator(event: IEvent) {
      return await User.findById(event.creator);
    }
  },
  Booking: {
    async event(booking: IBooking) {
      return await Event.findById(booking.event);
    },
    async user(booking: IBooking) {
      return await User.findById(booking.user);
    }
  },
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
    },
    events: async () => {
      return await Event.find();
    },
    bookings: async () => {
      return await Booking.find();
    }
  },
  Mutation: {
    createUser: async (_: any, { email, password }: IUser) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new ApolloError("User already exists.");
      const hashedPassword = await bcrypt.hash(password, 12);
      return User.create({ email, password: hashedPassword });
    },
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
    },
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

export default resolvers;

import Event from "../../models/event";
import User from "../../models/user";
import { transformEvent } from "./merge";
import { Request } from "express";

interface EventInputType {
  title: string;
  description: string;
  price: number;
  date: string;
}

export const resolvers = {
  events: async () => {
    try {
      const result = await Event.find();
      return result.map(transformEvent);
    } catch (err) {
      throw new Error(err);
    }
  },
  createEvent: async (
    { eventInput }: { eventInput: EventInputType },
    req: Request
  ) => {
    if (!req.isAuth) throw new Error("Unauthenticated request.");

    try {
      const event = new Event({
        title: eventInput.title,
        description: eventInput.description,
        price: +eventInput.price,
        date: new Date(eventInput.date),
        creator: req.userId
      });

      const creator = (await User.findById(req.userId))!;
      creator.createdEvents.push(event.id);
      await creator.save();

      const result = await event.save();
      return transformEvent(result);
    } catch (err) {
      throw new Error(err);
    }
  }
};

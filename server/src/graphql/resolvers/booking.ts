import { Request } from "express";
import Booking from "../../models/booking";
import Event from "../../models/event";
import { transformEvent, transformBooking } from "./merge";

export const resolvers = {
  bookings: async (_: any, req: Request) => {
    if (!req.isAuth) throw new Error("Unauthenticated request.");
    try {
      const result = await Booking.find();
      return result.map(transformBooking);
    } catch (err) {
      throw new Error(err);
    }
  },
  bookEvent: async ({ eventId }: { eventId: string }, req: Request) => {
    if (!req.isAuth) throw new Error("Unauthenticated request.");
    try {
      const booking = new Booking({
        user: req.userId,
        event: eventId
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      throw new Error(err);
    }
  },
  cancelBooking: async ({ bookingId }: { bookingId: string }, req: Request) => {
    if (!req.isAuth) throw new Error("Unauthenticated request.");
    try {
      const result = await Booking.findByIdAndDelete(bookingId);
      const event = (await Event.findById(result?.event))!;
      return transformEvent(event);
    } catch (err) {
      throw new Error(err);
    }
  }
};

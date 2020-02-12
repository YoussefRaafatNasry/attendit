import { Schema } from "mongoose";
import { dateToString } from "../../util/date";
import User, { IUser } from "../../models/user";
import Event, { IEvent } from "../../models/event";
import { IBooking } from "../../models/booking";

const getUser = async (id: Schema.Types.ObjectId): Promise<IUser> => {
  try {
    const result = (await User.findById(id))!;
    return transformUser(result);
  } catch (err) {
    throw new Error(err);
  }
};

const getEvent = async (id: Schema.Types.ObjectId): Promise<IEvent> => {
  try {
    const result = (await Event.findById(id))!;
    return transformEvent(result);
  } catch (err) {
    throw new Error(err);
  }
};

const getEvents = async (ids: Schema.Types.ObjectId[]): Promise<IEvent[]> => {
  try {
    const result = await Event.find({ _id: { $in: ids } });
    return result.map(transformEvent);
  } catch (err) {
    throw new Error(err);
  }
};

export const transformUser = (user: IUser): IUser => ({
  ...user.toObject(),
  _id: user.id,
  createdEvents: () => getEvents(user.createdEvents)
});

export const transformEvent = (event: IEvent): IEvent => ({
  ...event.toObject(),
  _id: event.id,
  date: dateToString(event.date),
  creator: () => getUser(event.creator)
});

export const transformBooking = (booking: IBooking): IBooking => ({
  ...booking.toObject(),
  _id: booking.id,
  user: () => getUser(booking.user),
  event: () => getEvent(booking.event),
  createdAt: dateToString(booking.createdAt),
  updatedAt: dateToString(booking.updatedAt)
});

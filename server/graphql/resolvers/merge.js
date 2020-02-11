const { dateToString } = require("../../util/date");
const User = require("../../models/user");
const Event = require("../../models/event");

const user = async id => {
  try {
    const result = await User.findById(id);
    return {
      ...result._doc,
      _id: result.id,
      createdEvents: events.bind(this, result._doc.createdEvents)
    };
  } catch (err) {
    return console.log(err);
  }
};

const event = async id => {
  try {
    const result = await Event.findById(id);
    return transformEvent(result);
  } catch (err) {
    return console.log(err);
  }
};

const events = async ids => {
  try {
    const result = await Event.find({ _id: { $in: ids } });
    return result.map(transformEvent);
  } catch (err) {
    return console.log(err);
  }
};

const transformEvent = event => ({
  ...event._doc,
  _id: event.id,
  date: dateToString(event._doc.date),
  creator: user.bind(this, event._doc.creator)
});

const transformBooking = booking => ({
  ...booking._doc,
  _id: booking.id,
  user: user.bind(this, booking._doc.user),
  event: event.bind(this, booking._doc.event),
  createdAt: dateToString(booking._doc.createdAt),
  updatedAt: dateToString(booking._doc.updatedAt)
});

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;

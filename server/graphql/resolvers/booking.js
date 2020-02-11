const Booking = require("../../models/booking");
const { transformEvent, transformBooking } = require("./merge");

module.exports = {
  bookings: async (_, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated request.");
    try {
      const result = await Booking.find();
      return result.map(transformBooking);
    } catch (err) {
      return console.log(err);
    }
  },
  bookEvent: async ({ eventId }, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated request.");
    try {
      const booking = new Booking({
        user: req.userId,
        event: eventId
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      return console.log(err);
    }
  },
  cancelBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated request.");
    try {
      const result = await Booking.findByIdAndDelete(bookingId).populate(
        "event"
      );
      return transformEvent(result.event);
    } catch (err) {
      return console.log(err);
    }
  }
};

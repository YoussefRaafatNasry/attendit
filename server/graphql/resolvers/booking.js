const Booking = require("../../models/booking");
const { transformEvent, transformBooking } = require("./merge");

const USER_ID = "5e41e4e2014dcb0d98097732"; // hardcoded for now

module.exports = {
  bookings: async () => {
    try {
      const result = await Booking.find();
      return result.map(transformBooking);
    } catch (err) {
      return console.log(err);
    }
  },
  bookEvent: async ({ eventId }) => {
    try {
      const booking = new Booking({
        user: USER_ID,
        event: eventId
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      return console.log(err);
    }
  },
  cancelBooking: async ({ bookingId }) => {
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

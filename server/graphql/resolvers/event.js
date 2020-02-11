const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const result = await Event.find();
      return result.map(transformEvent);
    } catch (err) {
      return console.log(err);
    }
  },
  createEvent: async ({ eventInput }, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated request.");

    try {
      const event = new Event({
        title: eventInput.title,
        description: eventInput.description,
        price: +eventInput.price,
        date: new Date(eventInput.date),
        creator: req.userId
      });

      const creator = await User.findById(req.userId);
      creator.createdEvents.push(event);
      await creator.save();

      const result = await event.save();
      return transformEvent(result);
    } catch (err) {
      return console.log(err);
    }
  }
};

const Event = require("../../models/event");
const { transformEvent } = require("./merge");

const USER_ID = "5e41e4e2014dcb0d98097732"; // hardcoded for now

module.exports = {
  events: async () => {
    try {
      const result = await Event.find();
      return result.map(transformEvent);
    } catch (err) {
      return console.log(err);
    }
  },
  createEvent: async ({ eventInput }) => {
    try {
      const event = new Event({
        title: eventInput.title,
        description: eventInput.description,
        price: +eventInput.price,
        date: new Date(eventInput.date),
        creator: USER_ID
      });

      const creator = await User.findById(USER_ID);
      creator.createdEvents.push(event);
      await creator.save();

      const result = await event.save();
      return transformEvent(result);
    } catch (err) {
      return console.log(err);
    }
  }
};

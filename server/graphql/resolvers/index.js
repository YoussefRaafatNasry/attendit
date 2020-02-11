const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");

const events = async ids => {
  try {
    const result = await Event.find({ _id: { $in: ids } });
    return result.map(event => ({
      ...event._doc,
      _id: event.id,
      date: new Date(event._doc.date).toISOString(),
      creator: user.bind(this, event._doc.creator)
    }));
  } catch (err) {
    return console.log(err);
  }
};

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

module.exports = {
  events: async () => {
    try {
      const result = await Event.find();
      return result.map(event => ({
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event._doc.creator)
      }));
    } catch (err) {
      return console.log(err);
    }
  },
  createEvent: async ({ eventInput }) => {
    try {
      const userId = "5e41e4e2014dcb0d98097732"; // hardcoded for now
      const event = new Event({
        title: eventInput.title,
        description: eventInput.description,
        price: +eventInput.price,
        date: new Date(eventInput.date),
        creator: userId
      });

      const result = await event.save();

      const creator = await User.findById(userId);
      creator.createdEvents.push(event);
      await creator.save();

      return {
        ...result._doc,
        _id: event.id,
        creator: user.bind(this, result._doc.creator)
      };
    } catch (err) {
      return console.log(err);
    }
  },
  createUser: async ({ userInput }) => {
    try {
      const existingUser = await User.findOne({ email: userInput.email });
      if (existingUser) return Error("User already exists.");

      const hashedPassword = await bcrypt.hash(userInput.password, 12);
      const user = new User({
        email: userInput.email,
        password: hashedPassword
      });
      const result = await user.save();
      return { ...result._doc, _id: user.id, password: "***" };
    } catch (err) {
      return console.log(err);
    }
  }
};

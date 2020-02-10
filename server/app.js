const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const mongoose = require("mongoose");
const Event = require("./models/event");
const User = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphQlHttp({
    graphiql: true,
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
      }

      type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input UserInput {
        email: String!
        password: String
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: async () => {
        try {
          const events = await Event.find();
          return events.map(event => ({ ...event._doc, _id: event.id }));
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

          return { ...result._doc, _id: event.id };
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
    }
  })
);

const uri =
  "mongodb+srv://" +
  `${process.env.MONGO_USER}:${process.env.MONGO_PASS}` +
  `@${process.env.MONGO_CLUSTER_ID}.mongodb.net/${process.env.MONGO_DB_NAME}` +
  "?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(process.env.PORT, () =>
      console.log(`Started Server at Port ${process.env.PORT}`)
    );
  })
  .catch(err => console.log(err));

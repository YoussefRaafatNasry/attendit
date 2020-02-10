const express = require("express");
const bodyParser = require("body-parser");

const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const mongoose = require("mongoose");
const Event = require("./models/event");

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
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
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
          const event = new Event({
            title: eventInput.title,
            description: eventInput.description,
            price: +eventInput.price,
            date: new Date(eventInput.date)
          });
          const result = await event.save();
          return { ...result._doc, _id: event.id };
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

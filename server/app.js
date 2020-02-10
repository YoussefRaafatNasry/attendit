const express = require("express");
const bodyParser = require("body-parser");

const graphQlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const mongoose = require("mongoose");

const app = express();

const events = [];

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
        date: String
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String
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
      events: () => events,
      createEvent: ({ eventInput }) => {
        const event = {
          _id: Math.random().toString(),
          title: eventInput.title,
          description: eventInput.description,
          price: +eventInput.price,
          date: new Date().toISOString()
        };
        events.push(event);
        return event;
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

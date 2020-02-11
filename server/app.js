const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const graphQlHttp = require("express-graphql");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphQlHttp({
    graphiql: true,
    schema: graphQlSchema,
    rootValue: graphQlResolvers
  })
);

mongoose
  .connect(
    "mongodb+srv://" +
      `${process.env.MONGO_USER}:${process.env.MONGO_PASS}` +
      `@${process.env.MONGO_CLUSTER_ID}.mongodb.net/${process.env.MONGO_DB_NAME}` +
      "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(process.env.PORT, () =>
      console.log(`Started Server at Port ${process.env.PORT}`)
    );
  })
  .catch(err => console.log(err));

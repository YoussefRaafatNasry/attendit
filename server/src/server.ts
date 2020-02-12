import * as express from "express";
import * as mongoose from "mongoose";
import isAuth from "./middleware/is-auth";

import { buildSchema } from "graphql";
import * as graphQlHttp from "express-graphql";
import * as graphQlSchema from "./graphql/schema/index";
import * as graphQlResolvers from "./graphql/resolvers/index";

const app = express();

app.use(express.json());
app.use(isAuth);

app.use(
  "/graphql",
  graphQlHttp({
    graphiql: true,
    schema: buildSchema(graphQlSchema.rootSchema),
    rootValue: graphQlResolvers.rootResolver
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
      console.log(`Started Server at http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => console.log(err));

import * as mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { authenticate } from "./middleware/auth";
import { typeDefs, resolvers } from "./graphql/schema";

(async () => {
  try {
    // MongoDB //

    const uri =
      "mongodb+srv://" +
      `${process.env.MONGO_USER}:${process.env.MONGO_PASS}` +
      `@${process.env.MONGO_CLUSTER_ID}.mongodb.net/${process.env.MONGO_DB_NAME}` +
      "?retryWrites=true&w=majority";

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const mongoInfo = await mongoose.connect(uri, options);
    console.log(`> Connected to MongoDB Atlas : ${mongoInfo.connection.name}`);

    // Apollo Server //

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        const header = req.headers.authorization || "";
        const meta = authenticate(header);
        return { userId: process.env.AUTH_USER_ID || meta?.userId };
      }
    });

    const serverInfo = await server.listen({ port: process.env.PORT });
    console.log(`> Server ready at ${serverInfo.url}`);
  } catch (e) {
    console.log(e);
  }
})();

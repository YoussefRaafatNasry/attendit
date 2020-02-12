import * as auth from "./auth";
import * as booking from "./booking";
import * as event from "./event";

export const rootResolver = {
  ...auth.resolvers,
  ...booking.resolvers,
  ...event.resolvers
};

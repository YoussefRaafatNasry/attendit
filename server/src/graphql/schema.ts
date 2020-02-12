import * as root from "./root";
import * as scalar from "./scalar";
import * as auth from "./auth";
import * as user from "./user";
import * as event from "./event";
import * as booking from "./booking";

const schemas = [root, scalar, auth, user, event, booking];

export const typeDefs = schemas.map(s => s.typeDef);
export const resolvers = schemas.map(s => s.resolvers);

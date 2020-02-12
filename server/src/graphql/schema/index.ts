import * as AuthSchema from "./auth";
import * as EventSchema from "./event";
import * as BookingSchema from "./booking";

const schemas = [AuthSchema, EventSchema, BookingSchema];

export const rootSchema = `
${schemas.map(s => s.typeDef).join("\n")}
${schemas.map(s => s.inputDef).join("\n")}

type RootQuery {
  ${schemas.map(s => s.queries).join("\n")}
}

type RootMutation {
  ${schemas.map(s => s.mutations).join("\n")}
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`;

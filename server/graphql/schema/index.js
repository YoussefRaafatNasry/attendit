const { buildSchema } = require("graphql");

const UserSchema = require("./user");
const EventSchema = require("./event");
const BookingSchema = require("./booking");

const schemas = [UserSchema, EventSchema, BookingSchema];

const rootSchema = `
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

module.exports = buildSchema(rootSchema);

import { gql } from "apollo-server";
import { GraphQLScalarType } from "graphql";

export const typeDef = gql`
  scalar DateTime
`;

export const resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime custom scalar type",
    parseValue(value) {
      return new Date(value).toISOString();
    },
    serialize(value) {
      return value.toISOString();
    }
  })
};

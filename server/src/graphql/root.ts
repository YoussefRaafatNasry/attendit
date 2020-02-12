import { gql } from "apollo-server";

export const typeDef = gql`
  type Query {
    _empty: Boolean
  }
  type Mutation {
    _empty: Boolean
  }
`;

export const resolvers = {};

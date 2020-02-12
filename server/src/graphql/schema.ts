import { gql } from "apollo-server";

const typeDefs = gql`
  scalar DateTime

  type AuthData {
    userId: ID!
    token: String!
    expiresIn: Int!
  }

  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }

  type Event {
    _id: ID!
    title: String!
    description: String
    price: Float!
    date: DateTime!
    creator: User!
  }

  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    login(email: String!, password: String!): AuthData
    events: [Event!]!
    bookings: [Booking!]!
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    createEvent(title: String!, description: String, price: Float!, date: DateTime!): Event
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }
`;

export default typeDefs;

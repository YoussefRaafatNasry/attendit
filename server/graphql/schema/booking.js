const typeDef = `
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}`;

const inputDef = ``;

const queries = `
bookings: [Booking!]!
`;

const mutations = `
bookEvent(eventId: ID!): Booking!
cancelBooking(bookingId: ID!): Event!
`;

module.exports = {
  typeDef,
  inputDef,
  queries,
  mutations
};

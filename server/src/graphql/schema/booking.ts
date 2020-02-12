export const typeDef = `
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}`;

export const inputDef = ``;

export const queries = `
bookings: [Booking!]!
`;

export const mutations = `
bookEvent(eventId: ID!): Booking!
cancelBooking(bookingId: ID!): Event!
`;

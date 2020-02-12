export const typeDef = `
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}`;

export const inputDef = `
input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}`;

export const queries = `
events: [Event!]!
`;

export const mutations = `
createEvent(eventInput: EventInput): Event
`;

const typeDef = `
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}`;

const inputDef = `
input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}`;

const queries = `
events: [Event!]!
`;

const mutations = `
createEvent(eventInput: EventInput): Event
`;

module.exports = {
  typeDef,
  inputDef,
  queries,
  mutations
};

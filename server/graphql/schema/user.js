const typeDef = `
type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}`;

const inputDef = `
input UserInput {
    email: String!
    password: String
}`;

const queries = ``;

const mutations = `
createUser(userInput: UserInput): User
`;

module.exports = {
  typeDef,
  inputDef,
  queries,
  mutations
};

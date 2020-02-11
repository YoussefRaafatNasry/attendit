const typeDef = `
type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData {
  userId: ID!
  token: String!
  expiresIn: Int!
}`;

const inputDef = `
input UserInput {
    email: String!
    password: String
}`;

const queries = `
login(userInput: UserInput): AuthData
`;

const mutations = `
createUser(userInput: UserInput): User
`;

module.exports = {
  typeDef,
  inputDef,
  queries,
  mutations
};

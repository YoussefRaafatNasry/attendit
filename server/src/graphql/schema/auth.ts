export const typeDef = `
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

export const inputDef = `
input UserInput {
    email: String!
    password: String
}`;

export const queries = `
login(userInput: UserInput): AuthData
`;

export const mutations = `
createUser(userInput: UserInput): User
`;

const { ApolloServer, gql } = require("apollo-server")

const { users, posts } = require("./data")

const typeDefs = gql(`
  type Query {
    users: [User!]!
    posts: [Post!]!
  }
  type Post {
    id: Int!
    title: String!
    author: User!
  }
  type User {
    id: Int!
    username: String!
    age: Int
    posts: [Post!]!
  }
`)



const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
  },
  User: {
    posts: (global) => posts.filter(post => post.userId === global.id),
  },
  Post: {
    author: (global) => {
      const auth = users.find(user => user.id === global.userId)
      return auth
    },
  },
}

const server = new ApolloServer({
  resolvers: resolvers,
  typeDefs: typeDefs,
})

server.listen(4002, () => console.log(4002))
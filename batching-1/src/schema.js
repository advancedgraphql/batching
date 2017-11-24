const { makeExecutableSchema } = require('graphql-tools')
const { fetchUserById, batchedUserFetching } = require('./db_users')

const typeDefs = `
type Query {
  user(id: ID!): User
  users(ids: [String!]!): [User!]!  
}

type User {
  id: ID!
  name: String
}`

const resolvers = {
  Query: {
    user: async (_, args) => {
      return await fetchUserById(args.id) // hit the database
    },
    users: async (_, args, context) => {
      // Naive implementation: Hit the dabatase for every single user
      // const users = []
      // for (const id of args.ids) {
      //   const user = await fetchUserById(id) // hit the database
      //   if (user) {
      //     users.push(user)           
      //   }
      // }
      // return users
      
      // Smart implementation (verbose): Batch all calls using DataLoader
      // return Promise.all(args.ids.map(id => {
      //   return context.dataloader.load(id) // batch calls
      // }))

      // Smart implementation: Batch all calls using DataLoader
      return context.dataloader.loadMany(args.ids)
    }
  }
}

module.exports = { 
  schema: makeExecutableSchema({typeDefs, resolvers})
}
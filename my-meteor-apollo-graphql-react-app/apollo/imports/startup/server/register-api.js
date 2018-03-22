import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import resolutionsSchema from '../../api/resolutions/Resolutions.graphql'
import resolutionsResolvers from '../../api/resolutions/resolvers'
import usersSchema from '../../api/users/User.graphql'
import usersResolvers from '../../api/users/resolvers'

//yoyoyo

const hiSchema = `
type Query {
  hi: String
  resolutions: [Resolution]
  user: User
}
`

const typeDefs = [
  hiSchema,
  resolutionsSchema,
  usersSchema,
]

const hiResolvers = {
  Query: {
    hi() {
      return 'Hello World!'
    }
  }
}

const resolvers = merge(
  hiResolvers,
  resolutionsResolvers,
  usersResolvers,
)

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })

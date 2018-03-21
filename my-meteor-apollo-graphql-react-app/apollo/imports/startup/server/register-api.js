import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import resolutionsSchema from '../../api/resolutions/Resolutions.graphql'
import resolutionsResolvers from '../../api/resolutions/resolvers'

const hiSchema = `
type Query {
  hi: String
  resolutions: [Resolution]
}
`

const typeDefs = [
  hiSchema,
  resolutionsSchema,
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
)

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })

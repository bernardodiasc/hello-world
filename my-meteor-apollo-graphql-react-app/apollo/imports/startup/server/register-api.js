import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql'

const hiSchema = `
type Query {
  hi: String
}
`

const typeDefs = [
  hiSchema,
  ResolutionsSchema,
]

const resolvers = {
  Query: {
    hi() {
      return 'Hello World!'
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })
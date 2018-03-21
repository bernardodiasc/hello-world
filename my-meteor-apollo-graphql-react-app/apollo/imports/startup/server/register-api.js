import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql'

const hiSchema = `
type Query {
  hi: String
  resolutions: [Resolution]
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
    },
    resolutions() {
      return [
        {
          _id: "aaa",
          name: "Get stuff done!",
        },
        {
          _id: "bbb",
          name: "Get more stuff done!!!",
        }
      ]
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })
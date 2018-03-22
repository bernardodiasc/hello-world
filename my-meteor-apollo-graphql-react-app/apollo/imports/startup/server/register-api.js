import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import resolutionsSchema from '../../api/resolutions/Resolutions.graphql'
import resolutionsResolvers from '../../api/resolutions/resolvers'
import usersSchema from '../../api/users/User.graphql'
import usersResolvers from '../../api/users/resolvers'

const typeDefs = [
  resolutionsSchema,
  usersSchema,
]

const resolvers = merge(
  resolutionsResolvers,
  usersResolvers,
)

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })

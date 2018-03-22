import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import resolutionsSchema from '../../api/resolutions/Resolutions.graphql'
import resolutionsResolvers from '../../api/resolutions/resolvers'
import usersSchema from '../../api/users/User.graphql'
import usersResolvers from '../../api/users/resolvers'
import goalsSchema from '../../api/goals/Goal.graphql'
import goalsResolvers from '../../api/goals/resolvers'

const typeDefs = [
  resolutionsSchema,
  usersSchema,
  goalsSchema,
]

const resolvers = merge(
  resolutionsResolvers,
  usersResolvers,
  goalsResolvers,
)

const schema = makeExecutableSchema({ typeDefs, resolvers })

createApolloServer({ schema })

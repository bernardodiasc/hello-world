import Resolutions from './resolutions'
import Goals from '../goals/goals'

export default {
  Query: {
    resolutions(obj, args, context) {
      return Resolutions.find({
        userId: context.userId
      }).fetch()
    }
  },

  Resolution: {
    goals: resolution => 
      Goals.find({
        resolutionId: resolution._id,
      }).fetch(),
    completed: resolution => {
      const goals = Goals.find({
        resolutionId: resolution._id,
        completed: false,
      }).fetch()
      return !goals.length
    }
  },

  Mutation: {
    createResolution(obj, args, context) {
      const resolutionId = Resolutions.insert({
        name: args.name,
        userId: context.userId,
      })
      return Resolutions.findOne(resolutionId)
    }
  }
}

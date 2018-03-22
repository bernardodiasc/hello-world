import Resolutions from './resolutions'

export default {
  Query: {
    resolutions(obj, args, context) {
      return Resolutions.find({
        userId: context.userId
      }).fetch()
    }
  },

  Mutation: {
    createResolution(obj, args, context) {
      const resolutionId = Resolutions.insert({
        name: args.name,
      })
      return Resolutions.findOne(resolutionId)
    }
  }
}

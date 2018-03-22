import Goals from './goals'

export default {
  Mutation: {
    createGoal(obj, args, context) {
      const goalId = Goals.insert({
        name: args.name,
        resolutionId: args.resolutionId,
        completed: false,
      })
      return Goals.findOne(goalId)
    }
  }
}

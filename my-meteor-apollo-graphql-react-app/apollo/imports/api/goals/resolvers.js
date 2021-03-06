import Goals from './goals'

export default {
  Mutation: {
    createGoal(obj, args, context) {
      if (context.userId) {
        const goalId = Goals.insert({
          name: args.name,
          resolutionId: args.resolutionId,
          completed: false,
        })
        return Goals.findOne(goalId)
      }
      throw new Error('Unauthorized')
    },
    toggleGoal(obj, args) {
      const goal = Goals.findOne(args._id)
      Goals.update(args._id, {
        $set: {
          completed: !goal.completed
        }
      })
      return Goals.findOne(args._id)
    }
  }
}

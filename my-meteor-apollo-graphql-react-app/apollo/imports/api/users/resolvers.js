export default {
  Query: {
    user(obj, args, context) {
      return context.user || {}
    }
  }
}

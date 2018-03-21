import Resolutions from './resolutions'

// Resolutions.insert({
//   name: 'test res',
// })

export default {
  Query: {
    resolutions() {
      return Resolutions.find({}).fetch()
    }
  }
}
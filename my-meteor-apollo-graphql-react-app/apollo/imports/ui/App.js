import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import ResolutionForm from './ResolutionForm'

const App = ({ loading, hi, resolutions }) => {
  if (loading) return null
  return (
    <div>
      <h1>{hi}</h1>
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>{resolution.name}</li>
        ))}
      </ul>
    </div>
  )
}

const hiQuery = gql`
  query Resolutions {
    hi
    resolutions {
      _id
      name
    }
  }
`

export default graphql(hiQuery, {
  props: ({ data }) => ({ ...data })
})(App)

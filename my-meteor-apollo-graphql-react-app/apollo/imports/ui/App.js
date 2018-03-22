import React from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'

import ResolutionForm from './ResolutionForm'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const App = ({ loading, hi, resolutions, client }) => {
  if (loading) return null
  return (
    <div>
      <h1>{hi}</h1>
      <RegisterForm client={client} />
      <LoginForm client={client} />
      <button onClick={() => {
        Meteor.logout()
        client.resetStore()
      }}>Log out</button>
      <hr />
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
})(withApollo(App))

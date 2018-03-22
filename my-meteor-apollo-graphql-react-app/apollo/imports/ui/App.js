import React from 'react'
import gql from 'graphql-tag'
import { graphql, withApollo } from 'react-apollo'

import ResolutionForm from './ResolutionForm'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import GoalForm from './GoalForm'
import Goal from './resolutions/Goal'

const App = ({ loading, resolutions, user, client }) => {
  if (loading) return null
  return (
    <div>
      <h1>Hello World</h1>
      {user._id ? (
        <button onClick={() => {
          Meteor.logout()
          client.resetStore()
        }}>Log out</button>
      ) : (
        <div>
          <LoginForm client={client} />
          <RegisterForm client={client} />
        </div>
      )}
      <hr />
      <ResolutionForm />
      <ul>
        {resolutions.map(resolution => (
          <li key={resolution._id}>
            {resolution.name}
            <ul>
              {resolution.goals.map(goal => (
                <Goal goal={goal} key={goal._id} />
              ))}
            </ul>
            <GoalForm resolutionId={resolution._id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const hiQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
    }
  }
`

export default graphql(hiQuery, {
  props: ({ data }) => ({ ...data })
})(withApollo(App))

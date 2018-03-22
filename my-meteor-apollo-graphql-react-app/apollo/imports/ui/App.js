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
      {user._id && <ResolutionForm />}
      {user._id && (
        <ul>
          {resolutions.map(resolution => (
            <li key={resolution._id}>
              <span style={{
                textDecoration: resolution.completed ? 'line-through' : 'none'
              }}>
                {resolution.name}
              </span>
              <ul>
                {resolution.goals.map(goal => (
                  <Goal goal={goal} key={goal._id} />
                ))}
              </ul>
              <GoalForm resolutionId={resolution._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const appQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      completed
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

export default graphql(appQuery, {
  props: ({ data }) => ({ ...data })
})(withApollo(App))

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const toggleGoal = gql`
  mutation toggleGoal($id: String!) {
    toggleGoal(_id: $id) {
      _id
    }
  }
`

class Goal extends Component {
  toggleGoal = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.goal._id
      }
    })
  }

  render() {
    return (
      <div>
        <input
          type="checkbox"
          onChange={this.toggleGoal}
          checked={this.props.goal.completed}
        />
        {this.props.goal.name}
      </div>
    )
  }
}

export default graphql(toggleGoal, {
  name: 'toggleGoal',
  options: {
    refetchQueries: [
      'Resolutions'
    ]
  }
})(Goal)

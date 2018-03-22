import React, { Component } from 'react'

export default class Goal extends Component {
  render() {
    return (
      <div>
        <input type="checkbox" />
        {this.props.goal.name}
      </div>
    )
  }
}

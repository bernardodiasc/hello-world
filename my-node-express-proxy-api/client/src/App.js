import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {users: [], series: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
    fetch('/api/published/series')
      .then(res => res.json())
      .then(series => this.setState({ series: series.member }));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h3>Users</h3>
        {this.state.users.map(user =>
          <p key={user.id}>{user.username}</p>
        )}
        <h3>Series</h3>
        {this.state.series.map(serie =>
          <details>
            <summary>{serie.name}</summary>
            <p>{JSON.stringify(serie)}</p>
          </details>
        )}
      </div>
    );
  }
}

export default App;

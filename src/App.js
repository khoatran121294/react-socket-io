import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import io from 'socket.io-client'

class App extends Component {
  constructor() {
    super()
    this.socket = io('http://localhost:8080')
    this.state = {
      currentSockets: []
    }

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React + Socket.IO = Rocket.IO</h1>
        </header>
        <div className="App-intro">
          <h3>Current Users</h3>
          <ul>
            {
              this.state.currentSockets.map((item, index) => {
                return <li key={index}>{item}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
  componentDidMount() {
    const that = this
    // display all current sockets
    this.socket.on('server_send_current_sockets', function (currentSockets) {
      that.setState({
        currentSockets
      })
    })
  }
}

export default App;

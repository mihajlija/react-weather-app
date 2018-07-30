import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      temp: '',
      wind: '',
      humidity: ''
    }
    this.getCity = this.getCity.bind(this)
    this.setResponse = this.setResponse.bind(this)
  }

  getCity (value) {
    console.log(value)
  }

  setResponse (myJson) {
    this.setState({
      name: myJson.name,
      temp: myJson.main.temp,
      wind: myJson.wind.speed,
      humidity: myJson.main.humidity
    })
  }

  handleEnter = e => {
    if (e.keyCode === 13) {
      let city = e.target.value
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=171fb93bde138475dbc8d8d90938ac48`
      )
        .then(response => response.json())
        .then(myJson => this.setResponse(myJson))
    }
  }

  componentDidMount () {}

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <input type='text' id='input' onKeyDown={this.handleEnter} />
        </header>
        <h1>{this.state.temp ? `${this.state.temp} C` : ''}</h1>
        <p>{this.state.name}</p>
        <p>{this.state.wind ? `wind ${this.state.wind} km/s` : ''}</p>
        <p>{this.state.humidity ? `humidity ${this.state.humidity} %` : ''}</p>
      </div>
    )
  }
}

export default App

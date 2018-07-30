import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      city: []
    }
    this.getCity = this.getCity.bind(this)
    this.setResponse = this.setResponse.bind(this)
  }

  getCity (value) {
    console.log(value)
  }

  setResponse (myJson) {
    let obj = {
      name: myJson.name,
      temp: myJson.main.temp,
      wind: myJson.wind.speed,
      humidity: myJson.main.humidity
    }
    console.log(obj)
    this.setState({
      city: [...this.state.city, obj]
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
    const arr = this.state.city
    return (
      <div className='App'>
        <header className='App-header'>
          <input type='text' id='input' onKeyDown={this.handleEnter} />
        </header>

        {arr.map(city => (
          <City
            key={city.name}
            temp={city.temp}
            name={city.name}
            wind={city.wind}
            humidity={city.humidity}
          />
        ))}

      </div>
    )
  }
}

class City extends Component {
  render () {
    return (
      <div>
        <h1>{this.props.temp ? `${this.props.temp} C` : ''}</h1>
        <p>{this.props.name}</p>
        <p>{this.props.wind ? `wind ${this.props.wind} km/s` : ''}</p>
        <p>{this.props.humidity ? `humidity ${this.props.humidity} %` : ''}</p>
      </div>
    )
  }
}

export default App

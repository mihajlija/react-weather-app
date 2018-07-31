import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      city: []
    }
  }

  getWeather = city => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=171fb93bde138475dbc8d8d90938ac48`
    )
      .then(response => response.json())
      .then(myJson => this.setResponse(myJson))
      .catch(() => this.setError(city))
  }

  setResponse = myJson => {
    let obj = {
      name: myJson.name,
      temp: myJson.main.temp,
      wind: myJson.wind.speed,
      humidity: myJson.main.humidity
    }
    this.setState({
      city: [...this.state.city, obj],
      error: ''
    })
  }

  setError = city => {
    let error = {
      name: city,
      error: `Sorry, no ${city} here`
    }
    this.setState({
      city: [...this.state.city, error]
    })
  }

  splitCitiesString = citiesString => {
    return citiesString.split(',')
  }

  handleEnter = e => {
    if (e.keyCode === 13) {
      if (e.target.value) {
        this.splitCitiesString(e.target.value).map(city =>
          this.getWeather(city)
        )
        this.inputField.value = ''
      }
    }
  }

  render () {
    const arr = this.state.city
    return (
      <div className='App'>
        <header className='App-header'>
          <input
            type='text'
            id='input'
            name='city'
            placeholder='search for a city'
            onKeyDown={this.handleEnter}
            ref={input => (this.inputField = input)}
            onFocus={() => (this.inputField.value = '')}
          />
        </header>
        <main>
          {arr.map(
            city =>
              (city.error
                ? <Error error={city.error} key={city.name} />
                : <City
                  key={city.name}
                  temp={city.temp}
                  name={city.name}
                  wind={city.wind}
                  humidity={city.humidity}
                  />)
          )}
        </main>
      </div>
    )
  }
}

class City extends Component {
  render () {
    return (
      <div className='city'>
        <h1>{this.props.temp ? `${this.props.temp} C` : ''}</h1>
        <p>{this.props.name}</p>
        <p>{this.props.wind ? `wind ${this.props.wind} km/s` : ''}</p>
        <p>{this.props.humidity ? `humidity ${this.props.humidity} %` : ''}</p>
      </div>
    )
  }
}

class Error extends Component {
  render () {
    return <p className='error'>{this.props.error}</p>
  }
}

export default App

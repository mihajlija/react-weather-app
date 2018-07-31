import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cities: []
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
      temp: Math.round(myJson.main.temp),
      wind: myJson.wind.speed,
      humidity: myJson.main.humidity,
      desc: myJson.weather[0].description
    }
    this.setState({
      cities: [...this.state.cities, obj],
      error: ''
    })
  }

  setError = city => {
    let error = {
      name: city,
      error: `Sorry, no ${city} here`
    }
    this.setState({
      cities: [...this.state.cities, error]
    })
  }

  splitCitiesString = citiesString => {
    var newstr = citiesString.replace(/,\s+/gi, ',')
    return newstr.split(',')
  }

  filterCities = arr => {
    let a = [...new Set(arr)] // create set from input array (keeps only unique elements)
    let b = this.state.cities.map(city => city.name.toLowerCase())
    let c = new Set(b) // transfrom array of previously entered cities into a set
    return a.filter(city => !c.has(city)) // use has() method to filter out cities that are already displayed
  }

  handleEnter = e => {
    if (e.keyCode === 13) {
      if (e.target.value) {
        let input = e.target.value.toLowerCase()
        // set cities into state
        let arr = this.splitCitiesString(input)
        let filtered = this.filterCities(arr)
        // match data to cities
        filtered.map(city => this.getWeather(city))

        this.inputField.value = ''
      }
    }
  }

  discard = name => () => {
    let filtered = this.state.cities.filter(
      city => city.name.toLowerCase() !== name.toLowerCase()
    )
    this.setState({
      cities: filtered
    })
  }

  render () {
    const arr = this.state.cities
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
                ? <Error
                  error={city.error}
                  name={city.name}
                  key={city.name}
                  discard={this.discard(city.name)}
                  />
                : <City
                  key={city.name}
                  temp={city.temp}
                  desc={city.desc}
                  name={city.name}
                  wind={city.wind}
                  humidity={city.humidity}
                  discard={this.discard(city.name)}
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
        <div className='left'>
          <p className='name'>{this.props.name}</p>
        </div>
        <div className='mid'>
          <h1>{this.props.temp} C</h1>
          <p className='desc'>{this.props.desc}</p>
        </div>
        <div className='right'>
          <p className='wind'>wind {this.props.wind} km/s</p>
          <p className='humidity'>humidity {this.props.humidity}%</p>
        </div>
        <div className='close' onClick={this.props.discard}>x</div>
      </div>
    )
  }
}

class Error extends Component {
  render () {
    return (
      <div>
        <p className='error'>{this.props.error}</p>
        <button onClick={this.props.discard}>x</button>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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
      humidity: myJson.main.humidity,
      visibility: true
    }
    let name = myJson.name
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
    var newstr = citiesString.replace(/,\s+/gi, ',')
    return newstr.split(',')
  }

  filterCities = arr => {
    let a = [...new Set(arr)] // create set from input array (keeps only unique elements)
    let b = this.state.city.map(city => city.name.toLowerCase()) // make an array of city names
    let c = new Set(b) // transfrom that array into a set
    return a.filter(city => !c.has(city)) // use has() method to filter out cities that are already displayed
  }

  handleEnter = e => {
    if (e.keyCode === 13) {
      if (e.target.value) {
        let arr = this.splitCitiesString(e.target.value)
        let filtered = this.filterCities(arr)
        filtered.map(city => this.getWeather(city))
        this.inputField.value = ''
      }
    }
  }

  discard = name => {}

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
        <main ref={node => (this.mainNode = node)}>
          {arr.map(
            city =>
              (city.error
                ? <Error error={city.error} key={city.name} />
                : city.visibility &&
                <City
                  key={city.name}
                  temp={city.temp}
                  name={city.name}
                  wind={city.wind}
                  humidity={city.humidity}
                  discard={this.discard}
                    />)
          )}
        </main>
      </div>
    )
  }
}

class City extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visibility: true
    }
  }

  toggle = () => {
    this.setState({
      visibility: false
    })
    this.props.discard(this.props.name)
  }

  render () {
    return this.state.visibility
      ? <div className='city'>
        <h1>{this.props.temp} C</h1>
        <p>{this.props.name}</p>
        <p>wind {this.props.wind} km/s</p>
        <p>
            humidity {this.props.humidity} %
          </p>
        <button onClick={this.toggle}>x</button>
      </div>
      : <div />
  }
}

const Error = props => {
  return <p className='error'>{props.error}</p>
}

export default App

import React, { Component } from 'react'
import './App.css'
import City from './components/City.js'
import Error from './components/Error.js'
import Placeholder from './components/Placeholder.js'


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
      .then(myJson => {
        this.setWeather(myJson)
      })
      .catch(() => this.setError(city))
  }

  setWeather = myJson => {
    let obj = {
      name: myJson.name,
      temp: Math.round(myJson.main.temp),
      wind: myJson.wind.speed,
      humidity: myJson.main.humidity,
      desc: myJson.weather[0].description
    }

    let key = myJson.name.toLowerCase()

    let cities = this.state.cities.map(x => {
      if (x.key === key) {
        obj.data = true
        obj.key = key
        return obj
      } else return x
    })
    this.setState({
      cities: cities
    })
  }

  setError = city => {
    let error = {
      key: city,
      name: city,
      error: `Sorry, no ${city} here`
    }

    let cities = this.state.cities.map(x => {
      if (x.key === city) {
        error.data = true
        return error
      } else return x
    })

    this.setState({
      cities: cities
    })
  }

  setPlaceholder = arr => {
    let input = arr.map(city => {
      let elem = { key: city, data: false, error: '' }
      return elem
    })
    let cities = [...this.state.cities, ...input]
    this.setState({ cities: cities })
  }

  splitCitiesString = citiesString => {
    return citiesString.replace(/,\s+/gi, ',').split(',')
  }

  filterCities = arr => {
    let a = [...new Set(arr)] // create set from input array (keeps only unique elements)
    let b = this.state.cities.map(city => city.key.toLowerCase())
    let c = new Set(b) // transfrom array of previously entered cities into a set
    return a.filter(city => !c.has(city)) // use has() method to filter out cities that are already displayed
  }

  handleEnter = e => {
    if (e.keyCode === 13) {
      if (e.target.value) {
        let input = e.target.value.toLowerCase()
        let arr = this.splitCitiesString(input)
        let filtered = this.filterCities(arr)
        // set cities into state
        this.setPlaceholder(filtered)
        // match data to cities
        filtered.map(city => this.getWeather(city))
        this.inputField.value = ''
      }
    }
  }

  discard = name => () => {
    let filtered = this.state.cities.filter(
      city => city.key.toLowerCase() !== name.toLowerCase()
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
          />
        </header>
        <main>
          {arr.map(
            city =>
              (!city.data
                ? <Placeholder key={city.key} name={city.key} />
                : city.error
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







export default App

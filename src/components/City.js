import React, { Component } from 'react'

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
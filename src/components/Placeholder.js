import React, { Component } from 'react'

class Placeholder extends Component {
    render () {
      return (
        <div className='city'>
            <p className='name'>Looking for {this.props.name} </p>
        </div>
      )
    }
  }
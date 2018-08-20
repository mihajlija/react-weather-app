import React, { Component } from 'react'

class Error extends Component {
    render () {
      return (
        <div className='city'>
          <div className='mid'>
            <p className='error'>{this.props.error}</p>
          </div>
          <div className='close' onClick={this.props.discard}>x</div>
        </div>
      )
    }
  }
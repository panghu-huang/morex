import React, { Component } from 'react'
import { connect, actions } from '../../src'
import './model'

class Child extends Component {

  handleClick = () => {
    actions.app.setName('name')
  }

  render() {
    return (
      <div className='app'>
        this is child - {String(this.props.app.name)}
        <button onClick={this.handleClick}>action</button>
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => {
  return { app }
}

export default connect(mapStateToProps)(Child)
import React, { Component } from 'react'
import { connect, actions } from '../../src'
import './model'

class Child extends Component {

  componentDidMount() {
    console.log(this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  handleClick = () => {
    actions.app.setName('name')
  }

  render() {
    return (
      <div className='app'>
        this is child
        <button onClick={this.handleClick}>action</button>
      </div>
    )
  }
}

const mapStateToProps = ({ app }) => {
  return { app }
}

export default connect(mapStateToProps)(Child)
// export default Child
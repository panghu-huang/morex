import React, { Component } from 'react'
import { AppProvider } from '../../src'
import Child from './Child'
import './model'

class App extends Component {

  renderConsumer = (app) => {
    return (
      <div>{JSON.stringify(app)}</div>
    )
  }

  render() {
    return (
      <div className='app'>
        <AppProvider>
          <Child modelName='name' otherProps/>
        </AppProvider>
      </div>
    )
  }
}

export default App
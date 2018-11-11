import React, { Component } from 'react'
import { AppProvider } from 'morex'
import Child from './Child'
import './model'
import './middleware'

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
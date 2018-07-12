import React, { Component, createContext } from 'react'
import { actions } from './actions'
import getModels from './model'

const { Provider, Consumer } = createContext()

class AppProvider extends Component {

  constructor(props) {
    super(props)
    const models = getModels()
    const data = {}
    models.forEach(model => {
      const { name, initialState = {}, reducers = {}, effects = {} } = model
      if (!name || 'string' !== typeof name) {
        return
      }
      data[name] = initialState
      actions[name] = {}
      this.addReducers(name, reducers)
      this.addEffects(name, effects)
    })
    this.state = { data }
  }

  addReducers = (name, reducers = {}) => {
    Object.keys(reducers).forEach((actionName) => {
      actions[name][actionName] = (...params) => {
        const { data } = this.state
        const newData = reducers[actionName].call(null, data[name], ...params)
        this.setState({ data: { ...data, [name]: newData } })
      }
    })
  }

  addEffects = (name, effects = {}) => {
    Object.keys(effects).forEach(actionName => {
      actions[name][actionName] = effects[actionName]
    })
  }

  render() {
    const { data } = this.state
    return (
      <Provider value={data}>
        {this.props.children}
      </Provider>
    )
  }
}

export { AppProvider, Consumer }
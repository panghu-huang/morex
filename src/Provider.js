import React, { Component, createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { actions } from './actions'
import RouterWrapper from './RouterWrapper'
import getModels from './model'
import getMiddlewares from './middlewares'

const { Provider, Consumer } = createContext()

class AppProvider extends Component {
  constructor(props) {
    super(props)
    const data = this.initialModel()
    this.state = { data }
    this.initialMiddlewares(data)
    this.getState = this.getState.bind(this)
  }

  initialModel() {
    const models = getModels()
    const data = {}
    models.forEach(model => {
      const { name, initialState = {}, reducers, effects } = model
      if(!name || 'string' !== typeof name || name === 'routing') {
        throw new Error(`invalid model name "${String(name)}"`)
      }
      data[name] = initialState
      actions[name] = {}
      this.addReducers(name, reducers)
      this.addEffects(name, effects)
    })
    return data
  }

  initialMiddlewares(initialStore) {
    const { NODE_ENV } = process.env
    const reduxDevTools = NODE_ENV === 'development'
      && window
      && window.devToolsExtension
    const middlewares = getMiddlewares()
    if(reduxDevTools) {
      const features = {
        jump: true
      }
      const devTools = reduxDevTools.connect({ name: 'More Store', features })
      devTools.init(initialStore)
      devTools.subscribe((data) => {
        switch (data.type) {
          case 'DISPATCH':
            const { type } = data.payload
            if(type === 'JUMP_TO_STATE' || type === 'JUMP_TO_ACTION') {
              this.setState({ data: JSON.parse(data.state) })
            }
          default:
            break
        }
      })
      middlewares.push((actionName, data) => {
        devTools.send({ type: actionName }, data)
      })
    }
    this.middlewares = middlewares
  }

  addReducers(name, reducers = {}) {
    Object.keys(reducers).forEach(actionName => {
      actions[name][actionName] = (...args) => {
        const { data } = this.state
        const newData = reducers[actionName].call(null, data[name], ...args)
        const updatedData = { ...data, [name]: newData }
        this.setState({ data: updatedData }, () => {
          this.middlewares.forEach(middleware => {
            middleware(actionName, updatedData, data)
          })
        })
      }
    })
  }

  addEffects(name, effects = {}) {
    Object.keys(effects).forEach(actionName => {
      actions[name][actionName] = async (...args) => {
        try {
          const result = await effects[actionName].apply(
            null,
            args.concat(this.getState)
          )
          return result
        } catch (error) {
          throw error
        }
      }
    })
  }

  getState() {
    return this.state.data
  }

  render() {
    const { data } = this.state
    return (
      <BrowserRouter>
        <Provider value={data}>
          <RouterWrapper>{this.props.children}</RouterWrapper>
        </Provider>
      </BrowserRouter>
    )
  }
}

export { AppProvider, Consumer }

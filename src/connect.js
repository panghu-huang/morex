import React, { Component } from 'react'
import { Consumer } from './Provider'

const connect = (mapping = store => store) => {
  return WappedComponent => {
    return class Wrapper extends Component {

      renderContent = store => {
        const props = mapping(store)
        if ('object' !== typeof props) {
          throw new Error('返回值应该是 Object 类型')
        }
        return <WappedComponent {...props} />
      }

      render() {
        return (
          <Consumer>
            {this.renderContent}
          </Consumer>
        )
      }

    }
  }
}

export default connect
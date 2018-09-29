import React, { Component } from 'react'
import { Consumer } from './Provider'

const connect = (mapping = store => store) => {
  return WappedComponent => {
    return class Wrapper extends Component {

      constructor(props) {
        super(props)
        this.renderContent = this.renderContent.bind(this)
      }

      renderContent(store) {
        const originProps = this.props
        const props = mapping(store, originProps)
        if ('object' !== typeof props) {
          throw new Error('返回值应该是 Object 类型')
        }
        return <WappedComponent {...originProps} {...props} />
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
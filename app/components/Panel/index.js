import React, { Component } from 'react'
import { array, object, oneOfType } from 'prop-types'
import less from './index.less'

export default class extends Component {

  static propTypes = {
    children: oneOfType([array, object]),
  }

  render() {
    const { children } = this.props
    return (
      <div className={less.viewport}>
        { children }
      </div>
    )
  }
}

import React, { Component } from 'react'
import { array, object, oneOfType, string } from 'prop-types'
import classnames from 'classnames'
import less from './index.less'

export default class extends Component {

  static propTypes = {
    children: oneOfType([array, object]).isRequired,
    className: string,
  }

  render() {
    const { children, className = '', ...restProps } = this.props
    return (
      <div className={classnames(less.viewport, className)} {...restProps}>
        { children }
      </div>
    )
  }
}

import React from 'react'
import { HashRouter } from 'react-router-dom'
import _ from 'lodash'
import registry from './registry'

const features = registry()
const routes = _.reduce(features, (accumulator, feature) => {
  return _.concat(accumulator, feature.routes)
}, [])

const Router = function() {
  return (
    <HashRouter>
      { routes }
    </HashRouter>
  )
}

export default Router

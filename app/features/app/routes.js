import React from 'react'
import { Route } from 'react-router'
import FakeLogin from './containers/FakeLogin'
const routes = [
  <Route key="fakeLogin" path="/" component={FakeLogin} />,
]

export default routes

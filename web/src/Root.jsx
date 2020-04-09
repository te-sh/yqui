import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Room from './Room'

const Root = () => {
  return (
    <Router>
      <Route exact path="/" component={Room}></Route>
    </Router>
  )
}

export default Root

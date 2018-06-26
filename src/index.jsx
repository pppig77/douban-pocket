import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom'
import App from './app'

ReactDOM.render(
  (<HashRouter>
    <App />
  </HashRouter>),
  document.getElementById('root')
)

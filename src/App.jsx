import React, { Component } from 'react'
import {
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'
import './style.css'
import Book from './page/book'
import Music from './page/music'
import Movie from './page/movie'

class App extends Component {
  render () {
    return (
      <div>
        <ul role='nav' className='nav'>
          <li><NavLink to='/book' activeClassName='active' exact>书</NavLink></li>
          <li><NavLink to='/movie' activeClassName='active'>电影</NavLink></li>
          <li><NavLink to='/music' activeClassName='active'>音乐</NavLink></li>
        </ul>
        {this.props.children}
        <Switch>
          <Route exact path='/book' component={Book} />
          <Route path='/movie' component={Movie} />
          <Route path='/music' component={Music} />
          <Redirect path='/' to={{pathname: '/book'}} />
        </Switch>
      </div>
    )
  }
}

module.exports = App

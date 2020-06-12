import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { requestChangeTheme } from '../../store/actions/index'
import NavigationBar from '../NavigationBar/NavigationBar'
import Auth from '../Auth/Auth'
import User from '../User/User'
import Notes from '../Notes/Notes'
import Spinner from '../UI/Spinner'
import images from '../../util/images'

import './App.scss'

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  onChangeTheme: () => dispatch(requestChangeTheme()),
})

const App = ({ app: { theme, loading, notesFetched }, user, onChangeTheme }) => {
  const history = useHistory()

  useEffect(() => {
    document.body.classList[`${theme === 'dark' ? 'add' : 'remove'}`]('dark')
  }, [theme])

  useEffect(() => {
    history.push('/')
  }, [history, notesFetched])

  /* Preload Images */
  useEffect(() => {
    images.forEach(image => {
      const img = new Image()
      img.src = image
    })
  }, [])

  return (
    <>
      <NavigationBar theme={theme} user={user} changeTheme={onChangeTheme} />

      {loading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route exact path="/" component={Notes} />
          <Route path="/auth" component={Auth} />
          <Route path="/account" component={User} />
        </Switch>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

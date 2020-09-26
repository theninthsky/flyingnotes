import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { createWebSocketConnection } from '../../socketConnection'
import { changeTheme, getNotes } from '../../store/actions'
import NavigationBar from '../NavigationBar/NavigationBar'
import Auth from '../Auth/Auth'
import User from '../User/User'
import Notes from '../Notes/Notes'
import Files from '../Files/Files'
import Spinner from '../UI/Spinner'

import images from '../../util/images'
import './App.scss'

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = { changeTheme, getNotes }

const App = ({ app: { theme, loading }, user, changeTheme, getNotes }) => {
  const history = useHistory()

  useEffect(() => {
    const connectToWebSocket = async () => {
      await createWebSocketConnection()

      getNotes()
    }

    connectToWebSocket()
  }, [getNotes])

  useEffect(() => {
    document.body.classList[`${theme === 'dark' ? 'add' : 'remove'}`]('dark')
  }, [theme])

  useEffect(() => {
    history.push('/')
  }, [user.name, history])

  /* Preload Images */
  useEffect(() => {
    images.forEach(image => {
      const img = new Image()
      img.src = image
    })
  }, [])

  return (
    <>
      <NavigationBar theme={theme} user={user} changeTheme={changeTheme} />

      {loading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route exact path={['/', '/notes']} component={Notes} />
          <Route path="/files" component={Files} />
          <Route path="/auth" component={Auth} />
          <Route path="/account" component={User} />
        </Switch>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

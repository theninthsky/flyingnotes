import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { createWebSocketConnection } from '../../socketConnection'
import { changeTheme } from '../../store/actions'
import NavigationBar from '../NavigationBar/NavigationBar'
import Auth from '../Auth/Auth'
import User from '../User/User'
import Notes from '../Notes/Notes'
import Files from '../Files/Files'
import Spinner from '../UI/Spinner'

import images from '../../util/images'
import './App.scss'

const { REACT_APP_SERVER_URL = 'http://localhost:5000' } = process.env

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
})

const mapDispatchToProps = { changeTheme }

const App = ({ app: { theme, loading, notesFetched }, user, changeTheme }) => {
  const history = useHistory()

  useEffect(() => {
    const connectToWebSocket = async () => {
      const {
        data: { bearerToken, userID },
      } = await axios.get(`${REACT_APP_SERVER_URL}/get-new-token`)

      createWebSocketConnection(bearerToken, userID)
    }

    connectToWebSocket()
  }, [])

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

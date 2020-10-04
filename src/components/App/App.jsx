import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import { createWebSocketConnection } from '../../websocketConnection'
import { changeTheme, getNotes } from '../../store/actions'
import preloadImages from '../../util/preloadImages'
import NavigationBar from '../NavigationBar'
import Auth from '../Auth'
import User from '../User'
import Notes from '../Notes'
import Files from '../Files'
import Spinner from '../UI/Spinner'

const GlobalStyle = createGlobalStyle`
  html {
    height: 100vh; // fixes gradient on mobile
  }

  body {
    margin: 0;
    color: ${({ theme }) => (theme === 'light' ? 'rgb(80, 80, 80)' : 'white')};
    background: ${({ theme }) => (theme === 'light' ? 'initial' : 'linear-gradient(#202020, #404040) fixed')};
    animation: showApp 0.5s;

    @keyframes showApp {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }

  img {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    &:visited {
      color: unset;
    }
  }
`

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
    history.push('/')
  }, [user.name, history])

  useEffect(() => {
    preloadImages()
  }, [])

  return (
    <>
      <GlobalStyle theme={theme} />

      <NavigationBar theme={theme} user={user} changeTheme={changeTheme} />

      {loading ? (
        <Spinner />
      ) : (
        <Switch>
          <Route exact path="/" component={Notes} />
          <Route path="/files" component={Files} />
          <Route path="/auth" component={Auth} />
          <Route path="/account" component={User} />
        </Switch>
      )}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

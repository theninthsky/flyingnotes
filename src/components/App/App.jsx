import { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import { createWebSocketConnection } from '../../websocketConnection'
import { getNotes } from '../../store/actions'
import preloadImages from '../../util/preloadImages'
import NavigationBar from '../NavigationBar'
import Auth from '../Auth'
import User from '../User'
import Notes from '../Notes'
import Files from '../Files'
import { Loader } from '../UI'

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

const App = () => {
  const dispatch = useDispatch()
  const { theme, loading, showAuth, user } = useSelector(
    ({ app: { theme, loading, showAuth }, user }) => ({
      theme,
      loading,
      showAuth,
      user,
    }),
    shallowEqual,
  )

  const history = useHistory()

  useEffect(() => {
    const connectToWebSocket = async () => {
      await createWebSocketConnection()

      dispatch(getNotes())
    }

    connectToWebSocket()
  }, [dispatch])

  useEffect(() => {
    preloadImages()
  }, [])

  useEffect(() => {
    if (!user.name) history.replace('/')
  }, [user.name, history])

  return (
    <>
      <GlobalStyle theme={theme} />

      <NavigationBar />

      {showAuth && !loading && (!user.name ? <Auth /> : <User />)}

      {loading ? (
        <Loader />
      ) : (
        <Switch>
          <Route exact path="/" component={Notes} />
          <Route path="/files" component={Files} />
        </Switch>
      )}
    </>
  )
}

export default App

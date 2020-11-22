import { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { createWebSocketConnection } from '../../websocketConnection'
import { getNotes } from '../../store/actions'
import preloadImages from '../../util/preloadImages'
import NavigationBar from '../NavigationBar'
import Auth from '../Auth'
import User from '../User'
import Notes from '../Notes'
import Files from '../Files'
import { Loader } from '../UI'
import { GlobalStyle } from './style'

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
          <Route exact path="/">
            <Notes />
          </Route>
          <Route path="/files">
            <Files />
          </Route>
        </Switch>
      )}
    </>
  )
}

export default App

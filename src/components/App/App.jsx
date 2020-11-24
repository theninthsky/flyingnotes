import { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useRecoilValue } from 'recoil'
import 'normalize.css'

import { createWebSocketConnection } from '../../websocketConnection'
import { getNotes } from '../../store/actions'
import { themeState, authIsOpenState } from './atoms'
import { userState } from '../User/atoms'
import preloadImages from '../../util/preloadImages'
import If from '../If'
import NavigationBar from '../NavigationBar'
import Auth from '../Auth'
import User from '../User'
import Notes from '../Notes'
import Files from '../Files'
import { Loader } from '../UI'
import { GlobalStyle } from './style'

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector(({ app: { loading } }) => loading, shallowEqual)

  const theme = useRecoilValue(themeState)
  const user = useRecoilValue(userState)
  const authIsOpen = useRecoilValue(authIsOpenState)

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

      <If condition={authIsOpen && !loading}>{!user.name ? <Auth /> : <User />}</If>

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

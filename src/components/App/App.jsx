import { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import 'normalize.css'

import { themeState, authIsOpenState, userState } from '../../atoms'
import preloadImages from '../../util/preloadImages'
import If from '../If'
import NavigationBar from '../NavigationBar'
import Auth from '../Auth'
import User from '../User'
import Notes from '../Notes'
import Files from '../Files'
import { GlobalStyle } from './style'

const App = () => {
  const theme = useRecoilValue(themeState)
  const user = useRecoilValue(userState)
  const authIsOpen = useRecoilValue(authIsOpenState)

  const history = useHistory()

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

      <If condition={authIsOpen}>{!user.name ? <Auth /> : <User />}</If>

      <Switch>
        <Route exact path="/">
          <Notes />
        </Route>
        <Route path="/files">
          <Files />
        </Route>
      </Switch>
    </>
  )
}

export default App

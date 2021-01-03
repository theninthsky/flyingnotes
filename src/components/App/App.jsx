import { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import 'normalize.css'

import { authIsVisibleState, userState } from 'atoms'
import If from 'components/If'
import NavigationBar from 'components/NavigationBar'
import Auth from 'components/Auth'
import User from 'components/User'
import Notes from 'components/Notes'
import Files from 'components/Files'
import { GlobalStyle, Title } from './style'
import 'util/preload-images'

document.documentElement.setAttribute('data-theme', localStorage.theme || 'light')

const App = () => {
  const user = useRecoilValue(userState)
  const authIsVisible = useRecoilValue(authIsVisibleState)

  const history = useHistory()

  useEffect(() => {
    if (!user.name) history.replace('/')
  }, [user.name, history])

  return (
    <>
      <GlobalStyle />

      <NavigationBar />

      <If condition={authIsVisible}>{!user.name ? <Auth /> : <User />}</If>

      <Switch>
        <Route exact path="/">
          <Title>Notes</Title>
          <Notes />
        </Route>
        <Route path="/files">
          <Title>Files</Title>
          <Files />
        </Route>
      </Switch>
    </>
  )
}

export default App

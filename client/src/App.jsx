import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import NavigationBar from './components/Navigation/NavigationBar'
import Auth from './components/Auth/Auth'
import User from './components/Auth/User'
import Notes from './components/Notes/Notes'
import Spinner from './components/UI/Spinner'
import * as actions from './store/actions/index'
import './App.scss'

import images from './util/images'

const App = props => {
  const {
    user,
    user: { theme, loading, notesFetched },
    onChangeTheme
  } = props

  const history = useHistory()

  useEffect(() => {
    theme === 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [theme])

  useEffect(() => {
    history.push('/')
  }, [history, notesFetched])

  /* Preload Images */
  useEffect(() => {
    images.forEach(image => {
      const img = new Image()
      img.src = image.fileName
    })
  }, [])

  return (
    <>
      <NavigationBar user={user} changeTheme={onChangeTheme} />

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

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  onChangeTheme: () => dispatch(actions.changeTheme())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)

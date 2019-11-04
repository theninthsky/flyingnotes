import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from './components/Navigation/NavigationBar';
import Notes from './containers/Notes/Notes';
import Spinner from './components/UI/Spinner';
import './App.scss';

const App = props => {
  useEffect(() => {
    console.log('[App] rendered!');
    document.body.style.backgroundColor = props.user.theme === 'light' ? 'white' : 'rgb(32, 32, 32)';
  }, [props.user.theme]);

  return (
    <>
      <NavigationBar theme={props.user.theme} />
      <Switch>
        <Route exact path="/" component={props.user.loading ? Spinner : Notes} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);

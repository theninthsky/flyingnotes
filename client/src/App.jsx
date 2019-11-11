import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavigationBar from './components/Navigation/NavigationBar';
import Notes from './containers/Notes/Notes';
import Spinner from './components/UI/Spinner';
import './App.scss';

const lightTheme = 'white';
const darkTheme = 'linear-gradient(#202020, #404040) fixed';

const App = props => {
  useEffect(() => {
    console.log('[App] rendered!');
    document.body.style.background = props.user.theme === 'light' ? lightTheme : darkTheme;
  }, [props.user.theme]);

  return (
    <>
      <NavigationBar user={props.user} />
      { props.user.loading || props.user.fetchingNotes ? <Spinner /> : <Notes /> }
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from './components/Navigation/NavigationBar';
import Notes from './containers/Notes/Notes';
import './App.scss';

const App = props => {
  const { myNotes, groupNotes, rssNotes } = props;

  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path="/" render={props => <Notes notes={myNotes} />} />
        <Route path="/group-notes" render={props => <Notes notes={groupNotes} />} />
        <Route path="/rss-notes" render={props => <Notes notes={rssNotes} />} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

const mapStateToProps = state => ({
  myNotes: state.myNotes,
  groupNotes: state.groupNotes,
  rssNotes: state.rssNotes
});

export default connect(mapStateToProps)(App);

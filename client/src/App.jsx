import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RSSParser from 'rss-parser';

import NavigationBar from './components/Navigation/NavigationBar';
import Notes from './containers/Notes/Notes';
import * as actionTypes from './store/actions/actionTypes';
import './App.scss';

const App = props => {
  const { myNotes, groupNotes, rssNotes, updateMyNotes, updateGroupNotes, updateRssNotes } = props;
  
  /* DUMMY DB */
  const dbNotes = {
    myNotes: [
      { title: 'The Unspeakable Truth111111111', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falsy Truth', content: 'There is such thing.', date: new Date().toDateString() },
      { title: 'The kable Truth', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falsy Truth', content: 'There is such thing.', date: new Date().toDateString() },
      { title: 'The Unspeakable Truth', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falsy Truth', content: 'There is such thing.', date: new Date().toDateString() },
      { title: 'The Unkable Truth', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falth', content: 'There is such thing.', date: new Date().toDateString() },
      { title: 'The Unspeakable Truth', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falsy Truth', content: 'There is sdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddduch thing.', date: new Date().toDateString() },
      { title: 'The Unspeakable Truth', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falsy Truth', content: 'There is such thing.', date: new Date().toDateString() },
      { title: 'The Unsable Truth', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falsy uth', content: 'There is such thing.', date: new Date().toDateString() },
      { title: 'The Unspeaooooookable Truth', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falsy Truth', content: 'There is such thing.', date: new Date().toDateString() },
      { title: 'The Unle Truth', content: 'No such thing.', date: new Date().toDateString() },
      { title: 'The Falsy Truth', content: 'There is such thing.', date: new Date().toDateString() },
      { content: 'There is such thing.', date: new Date().toDateString() },
      { title: 'The Falsy T', content: `There is such thi
      ngtttttttttttttttttttttttgt gttttttttttttttttttttttrrrrrrrrrrrrrfrf
         gtgtgt     dddd
         dddddddddd       gttttttttttttttt
         ttttttttgt gttttttttttttttttttttttrrrrrrrrrrrrrfrf
            gtgtgt     dddddd
            dddddddd        gtruthgttttttttttttt
            ttttttttttgt gttttttttt
            tttttttttttttrrrrrrrrrrrrrfr
            f   gtgtgt     dddddddddddd
            dd        gtruth gt
            ruthg.`, date: new Date().toDateString() }
    ],
    groupNotes: [
      { groupName: 'Herolo Workers', title: 'Announcements', content: 'You are fired!', date: new Date().toDateString() }
    ],
    rssFeeds: [{ title: 'Reddit',url: 'http://www.reddit.com/.rss' }, { title: 'BBC', url: 'http://feeds.bbci.co.uk/news/rss.xml' }, { title: 'Ynet', url: 'http://www.ynet.co.il/Integration/StoryRss2.xml'}]
  };
  
  const fetchRss = async ({title, url}) => {
    const parser = new RSSParser();
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const feed = await parser.parseURL(CORS_PROXY + url);
    updateRssNotes(title, feed);
  };
  
  useEffect(() => {
    console.log('[App] rendered!');
    if (JSON.stringify(dbNotes.myNotes) !== JSON.stringify(myNotes)) {
      updateMyNotes(dbNotes.myNotes);
    }
    if (JSON.stringify(dbNotes.groupNotes) !== JSON.stringify(groupNotes)) {
      updateGroupNotes(dbNotes.groupNotes);
    }
    for (const feed of dbNotes.rssFeeds) {
      fetchRss(feed);
    }
  }, [ /*myNotes, groupNotes, updateMyNotes, updateGroupNotes, updateRssNotes */]);

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

const mapDispatchToProps = dispatch => ({
  updateMyNotes: myNotes => dispatch({ type: actionTypes.UPDATE_PERSONAL_NOTES, notes: myNotes }),
  updateGroupNotes: groupNotes => dispatch({ type: actionTypes.UPDATE_GROUP_NOTES, notes: groupNotes }),
  updateRssNotes: (title, feed) => dispatch({ type: actionTypes.UPDATE_RSS_NOTES, title: title, feed: feed })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

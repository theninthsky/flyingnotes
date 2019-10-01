import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RSSParser from 'rss-parser';

import NavigationBar from './components/Navigation/NavigationBar';
import Notes from './containers/Notes/Notes';
import * as actionTypes from './store/actions/actionTypes';
import './App.scss';

const App = props => {
  const { myNotes, groupNotes, rssNotes, setRssNotes, updateMyNotes, updateGroupNotes, updateRssNote } = props;
  
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
    rssFeeds: [{ name: 'Reddit',url: 'http://www.reddit.com/.rss' }, { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/rss.xml' }, { name: 'Ynet', url: 'http://www.ynet.co.il/Integration/StoryRss2.xml'}]
  };

  const storeRssFeeds = () => {
    for (const feed of dbNotes.rssFeeds) {
      fetchRss(feed);
    }
  };
  
  const fetchRss = async ({name, url}) => {
    const parser = new RSSParser();
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const feed = await parser.parseURL(CORS_PROXY + url);
    updateRssNote(name, feed);
  };
  
  useEffect(() => {
    console.log('[App] rendered!');
    if (JSON.stringify(dbNotes.myNotes) !== JSON.stringify(myNotes)) {
      updateMyNotes(dbNotes.myNotes);
    }
    if (JSON.stringify(dbNotes.groupNotes) !== JSON.stringify(groupNotes)) {
      updateGroupNotes(dbNotes.groupNotes);
    }
    setRssNotes(dbNotes.rssFeeds);
    storeRssFeeds();
    setInterval(storeRssFeeds, 30000); // refetch RSS feeds every 30 secs
  }, [ /*myNotes, groupNotes, updateMyNotes, updateGroupNotes, updateRssNotes */]);

  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path="/" render={props => <Notes notes={myNotes} />} />
        <Route path="/group-notes" render={props => <Notes notes={groupNotes} />} />
        <Route path="/rss-notes" render={props => <Notes notes={rssNotes} pathname={props.location.pathname} />} />
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
  setRssNotes: rssFeeds => dispatch({ type: actionTypes.SET_RSS_NOTES, feeds: rssFeeds }),
  updateRssNote: (name, feed) => dispatch({ type: actionTypes.UPDATE_RSS_NOTE, name: name, feed: feed })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Fragment, useEffect, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';

import Note from '../../components/Note/Note';
import NewNote from '../../components/Note/NewNote';
import NewRssFeed from '../../components/Note/NewRssFeed';
import * as actions from '../../store/actions/index';
import styles from './Notes.module.scss';

const Notes = props => {
    const { dataFetched, userNotes, rssNotes, fetchData, setUserNotes, setRssNotes, updateRssNotes } = props;
    
    const rssUpdater = useCallback(() => updateRssNotes(rssNotes), [updateRssNotes, rssNotes]);

    useEffect(() => {
        console.log('[Notes] rendered!');
        if (!userNotes.length && !rssNotes.length) {
            if (localStorage.userId) {
                if (!dataFetched) {
                    fetchData();
                }
            } else {
                if (localStorage.notes) {
                    setUserNotes(JSON.parse(localStorage.notes));
                }
                if (localStorage.feeds) {
                    setRssNotes(JSON.parse(localStorage.feeds));
                }
            }
        }
        const autoRssUpdater = rssNotes.length && setInterval(rssUpdater, 30000); // refetch RSS feeds every 30 secs

        return () => clearInterval(autoRssUpdater);
    }, [dataFetched, userNotes, rssNotes, fetchData, setUserNotes, setRssNotes, updateRssNotes, rssUpdater]);

    const usernotes = useMemo(() => [...userNotes].reverse().map((note, ind) => 
        <Note key={note['_id'] || ind} title={note.title} content={note.content} date={note.date} />
    ), [userNotes]);
    
    // every time a feed is fetched and updated, all of the other notes rerender aswell ( O(n^2) ), this is due to the fact that this array is restructured on every render.
    // however, the update isn't that frequent (every 30s) and therefore this isn't a real problem.
    const rssnotes = useMemo(() => rssNotes.map((note, ind) => 
        <Note 
            key={note['_id'] || ind}
            name={note.name}
            content={
                Array.isArray(note.content) ? note.content.map((item, ind) => 
                    <Fragment key={ind}>
                        • <a href={item.link} title={item.content} rel="noopener noreferrer" target="_blank">{item.title}</a>
                        <br />
                        <br />
                    </Fragment>
                ) : note.content
            }
            date={note.date}
        />), [rssNotes]);

    return (
        <div className={styles.notesContainer}>
            { props.pathname === '/rss-notes' ? <NewRssFeed /> : <NewNote /> }
            { props.pathname === '/rss-notes' ? rssnotes : usernotes }
        </div>
    );
};

const mapStateToProps = state => ({
    dataFetched: state.user.dataFetched,
    userNotes: state.userNotes,
    rssNotes: state.rssNotes
  });
  
  const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(actions.fetchData()),
    setUserNotes: notes => dispatch(actions.setUserNotes(notes)),
    setRssNotes: feeds => dispatch(actions.setRssNotes(feeds)),
    updateRssNotes: feeds => dispatch(actions.updateRssNotes(feeds))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Notes);


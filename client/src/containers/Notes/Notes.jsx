import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import Note from '../../components/Note/Note';
import NewNote from '../../components/Note/NewNote';
import NewRssFeed from '../../components/Note/NewRssFeed';
import * as actions from '../../store/actions/index';
import styles from './Notes.module.scss';

const Notes = props => {
    const { myNotes, rssNotes, updateMyNotes, setRssNotes, updateRssNotes } = props;
    
    useEffect(() => {
        console.log('[Notes] rendered!');
        updateMyNotes();
        setRssNotes();
        updateRssNotes();
        const rssAutoUpdater = setInterval(updateRssNotes, 30000); // refetch RSS feeds every 30 secs

        return () => clearInterval(rssAutoUpdater);
    }, [updateMyNotes, setRssNotes, updateRssNotes]);
    
    const mynotes = useMemo(() => [...myNotes].reverse().map(
        note => <Note title={note.title} content={note.content} date={note.date} />
    ), [myNotes]);
    
    // every time a feed is fetched and updated, all of the other notes rerender aswell (100 feeds = 10000 rerenders), this is due to the face that this array is restructured on every render.
    // however, the update isn't that frequent (every 30s) and therefore this isn't a real problem.
    const rssnotes = rssNotes.map(note => 
        <Note 
            name={note.name}
            content={
                note.content.map(item => 
                    <>
                        • <a href={item.link} title={item.content} rel="noopener noreferrer" target="_blank">{item.title}</a>
                        <br />
                        <br />
                    </>
                )
            }
            date={note.date} 
        />);

    return (
        <div className={styles.notesContainer}>
            { props.pathname === '/rss-notes' ? <NewRssFeed /> : <NewNote /> }
            { props.pathname === '/rss-notes' ? rssnotes : mynotes }
        </div>
    );
};

const mapStateToProps = state => ({
    myNotes: state.myNotes,
    rssNotes: state.rssNotes
  });
  
  const mapDispatchToProps = dispatch => ({
    updateMyNotes: () => dispatch(actions.updateMyNotes()),
    setRssNotes: () => dispatch(actions.setRssNotes()),
    updateRssNotes: () => dispatch(actions.updateRssNotes())
  });

export default connect(mapStateToProps, mapDispatchToProps)(Notes);


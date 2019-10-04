import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';

import Note from '../../components/Note/Note';
import NewNote from '../../components/Note/NewNote';
import NewRssFeed from '../../components/Note/NewRssFeed';
import * as actions from '../../store/actions/index';
import styles from './Notes.module.scss';

const Notes = memo(props => {
    const { myNotes, rssNotes, updateMyNotes, setRssNotes, updateRssNotes } = props;
    
    useEffect(() => {
        console.log('[Notes] rendered!');
        updateMyNotes();
        setRssNotes();
        updateRssNotes();
        setInterval(updateRssNotes, 30000); // refetch RSS feeds every 30 secs
    }, []);
    
    const notes = props.pathname === '/rss-notes' ?
        rssNotes.map(note => 
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
            />) :
        [...myNotes].reverse().map(
            note => <Note title={note.title} content={note.content} date={note.date} />
        );

    return (
        <div className={styles.notesContainer}>
            { props.pathname === '/rss-notes' ? <NewRssFeed /> : <NewNote pathname={window.location.pathname} /> }
            {notes}
        </div>
    );
});

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


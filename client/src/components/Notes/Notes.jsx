import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import Note from './Note';
import NewNote from './NewNote';
import * as actions from '../../store/actions/index';
import styles from './Notes.module.scss';

const Notes = props => {
    const { user: { theme, loading, notesFetched, localNotesSet }, notes, fetchNotes } = props;

    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    useEffect(() => {
        if (!notesFetched && !localNotesSet) {
            fetchNotes();
        }
    }, [notesFetched, localNotesSet, fetchNotes]);

    const categoryFilterHandler = event => setCategoryFilter(event.target.value);

    const searchFilterHandler = event => setSearchFilter(event.target.value.toLowerCase());

    const filteredNotes = useMemo(() => [...notes]
        .filter(({ category }) => !categoryFilter ? true : category === categoryFilter)
        .filter(({ title, content }) => (`${title} ${content}`).toLowerCase().includes(searchFilter))
        .sort((a, b) => b.date - a.date)
        .map(note =>
            <Note
                key={note._id}
                _id={note._id}
                color={note.color}
                category={note.category}
                title={note.title}
                content={note.content}
                date={note.date}
                fileName={note.fileName}
                file={note.file}
            />
        ), [notes, categoryFilter, searchFilter]);

    return (
        <>
            {!loading ?
                <>
                    <div className={`${styles.filters} ${theme === 'dark' ? styles.filtersDark : ''}`}>
                        <select
                            className={`${styles.categoryFilter} ${theme === 'dark' ? styles.categoryFilterDark : ''}`}
                            title="Category"
                            onChange={categoryFilterHandler}
                        >
                            <option defaultValue value="">ALL</option>
                            {notes
                                .sort((a, b) => a.category.localeCompare(b.category))
                                .filter(({ category }, ind, notes) => category && category !== (notes[ind + 1] && notes[ind + 1].category))
                                .map(({ category, _id }) => <option key={_id}>{category}</option>)}
                        </select>
                        <div className={`${styles.searchFilter} ${theme === 'dark' ? styles.searchFilterDark : ''}`}>
                            <i className={'fa fa-search ' + styles.searchIcon}></i>
                            <input
                                className={styles.searchBox}
                                type="search"
                                value={searchFilter}
                                placeholder="Search..."
                                onChange={searchFilterHandler}
                            />
                        </div>
                    </div>

                    <div className={styles.notesContainer}>
                        <NewNote />
                        {filteredNotes}
                    </div>
                </> :
                null}

        </>
    );
};

const mapStateToProps = state => ({
    user: state.user,
    notes: state.notes
});

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(actions.fetchNotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);


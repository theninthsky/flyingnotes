import * as actionTypes from './actionTypes';

/* DUMMY DB */
const myNotes = [
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
];

export const updateMyNotes = () => ({ 
    type: actionTypes.UPDATE_MY_NOTES, 
    notes: myNotes 
});

export const addNewNote = note => {
    // POST TO DB
    return { type: actionTypes.ADD_NEW_NOTE, note: note }
};
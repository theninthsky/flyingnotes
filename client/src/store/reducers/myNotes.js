const initialState = [
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_PERSONAL_NOTE':
            return [ ...state, action.note ];
        default: return [...state];
    }
};

export default reducer;
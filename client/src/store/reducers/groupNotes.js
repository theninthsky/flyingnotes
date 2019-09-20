const initialState = [
    { groupName: 'Herolo Workers', title: 'Announcements', content: 'You are fired!', date: new Date().toDateString() }
];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_GROUP_NOTE':
            return [ ...state, action.note ];
        default: return [...state];
    }
};

export default reducer;
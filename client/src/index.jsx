import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './App';
import userReducer from './store/reducers/user';
import userNotesReducer from './store/reducers/userNotes';
import rssNotesReducer from './store/reducers/rssNotes';

const composeEnhancers = process.env.NODE_ENV === 'development' ? 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || null || compose : 
    null || compose;

const rootReducer = combineReducers({
    user: userReducer,
    userNotes: userNotesReducer,
    rssNotes: rssNotesReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root')
);

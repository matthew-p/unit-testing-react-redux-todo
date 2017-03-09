import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {TodoAppContainer} from './components/TodoApp';

require('../node_modules/todomvc-app-css/index.css');

const createStoreDevTools = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

// instantiate a new redux store
const store = createStoreDevTools(reducer);
// dispatch the SET_STATE action holding the desired initial state
store.dispatch({
    type: 'SET_STATE',
    state: {
        todos: [
            {id: 1, text: 'React', status: 'active', editing: false},   
            {id: 2, text: 'Redux', status: 'active', editing: false},
            {id: 3, text: 'Immutable', status: 'completed', editing: false}
        ],
        filter: 'all'
    }
})

ReactDOM.render(
    // wrap the app in a provider component to pass the store down to the components
    <Provider store={store}>
        <TodoAppContainer />
    </Provider>,
    document.getElementById('app')
);
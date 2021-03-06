import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

function startingTodos() {
    return {
            todos: [
                {id: 1, text: 'React', status: 'active'},
                {id: 2, text: 'Redux', status: 'active'},
                {id: 3, text: 'Immutable', status: 'completed'}
            ]
        };
}

describe('reducer', () => {
    it ('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                todos: List.of(
                    Map({id: 1, text: 'React', status: 'active'}),
                    Map({id: 2, text: 'Redux', status: 'active'}),
                    Map({id: 3, text: 'Immutable', status: 'completed'})
                )
            })
        };

        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active'},
                {id: 2, text: 'Redux', status: 'active'},
                {id: 3, text: 'Immutable', status: 'completed'}
            ]
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: "SET_STATE",
            state: {
                todos: [
                    {id: 1, text: 'React', status: 'active'},
                    {id: 2, text: 'Redux', status: 'active'},
                    {id: 3, text: 'Immutable', status: 'completed'}
                ]
            }
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active'},
                {id: 2, text: 'Redux', status: 'active'},
                {id: 3, text: 'Immutable', status: 'completed'}
            ]
        }));
    });

    it('handles SET_STATE without an initial state', () => {
        const action = {
            type: "SET_STATE",
            state: {
                todos: [
                    {id: 1, text: 'React', status: 'active'},
                    {id: 2, text: 'Redux', status: 'active'},
                    {id: 3, text: 'Immutable', status: 'completed'}
                ]
            }
        };
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active'},
                {id: 2, text: 'Redux', status: 'active'},
                {id: 3, text: 'Immutable', status: 'completed'}
            ]
        }));
    });

    it('handles TOGGLE_COMPLETE by changing the status form active to completed', () => {
        const initialState = fromJS(
            startingTodos()
        );
        const action = {
            type: 'TOGGLE_COMPLETE',
            itemId: 1
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'completed'},
                {id: 2, text: 'Redux', status: 'active'},
                {id: 3, text: 'Immutable', status: 'completed'}
            ]
        }));
    });
    it('handles TOGGLE_COMPLETE by changing the status from completed to active', () => {
        const initialState = fromJS(
            startingTodos()
        );
        const action = {
            type: 'TOGGLE_COMPLETE',
            itemId: 3
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active'},
                {id: 2, text: 'Redux', status: 'active'},
                {id: 3, text: 'Immutable', status: 'active'}
            ]
        }))
    })

    it('handles CHANGE_FILTER by changing the filter setting', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, text: "React", status: "active"}
            ],
            filter: "all"
        });
        const action = {
            type: "CHANGE_FILTER",
            filter: 'active'
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active'}
            ],
            filter: 'active'
        }));
    });

    it('handler EDIT_ITEM by setting editing status to true', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: false}
            ]
        });
        const action = {
            type: "EDIT_ITEM",
            itemId: 1
        }
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: true},
            ]
        }));
    });

    it ("handles CANCEL_EDITING by setting editing status to false", () => {
        const initialState = fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: true},
            ]
        });
        const action = {
            type: "CANCEL_EDITING",
            itemId: 1
        }
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: false},
            ]
        }));
    });

    it('handles DONE_EDITING by updating the text', () => {
        const initialState = fromJS({
            todos: [
                {id: 1, text: 'React', status: 'active', editing: true}
            ]
        });
        const action = {
            type: 'DONE_EDITING',
            itemId: 1,
            newText: 'Redux'
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            todos: [
                {id:1, text:"Redux", status: 'active', editing: false}
            ]
        }));
    });
});
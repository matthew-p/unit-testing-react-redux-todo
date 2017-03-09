import {Map} from 'immutable';

function setState(state, newState) {
    return state.merge(newState);
}

function findItemIndex(state, itemId) {
    return state.get('todos').findIndex(
        (item) => item.get('id') === itemId
    );
}

function toggleComplete(state, itemId) {
    //find the array index in todos associated with itemId
    // const itemIndex = state.get('todos').findIndex(
    //     (item) => item.get('id') === itemId
    // );
    const itemIndex = findItemIndex(state, itemId);
    // update the todo item at that index,
    // get the todos list, get the right todo item object from it,
    // call update on that object, which takes a key of a value in the object,
    // and a function that takes the value as its argument, and returns a 
    // new object/Map with the key's value set to the return value of the function
    const updatedItem = state.get('todos')
        .get(itemIndex)
        .update('status', status => status === 'active' ? 'completed' : 'active');
    // update the state to account for the newly modified todo item
    // uses update as above, where the function is then calling .set(),
    // which returns a new List which includes the value passed in as the second argument, 
    // at the index passed in as the first argument. 
    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function changeFilter(state, filter) {
    // set the given key in the state, to the value passed in as the second argument
    return state.set('filter', filter);
}

function editItem(state, itemId) {
    const itemIndex = findItemIndex(state, itemId);
    const updatedItem = state.get('todos')
                        .get(itemIndex)
                        .set('editing', true);
    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function cancelEditing(state, itemId) {
    const itemIndex = findItemIndex(state, itemId);
    const updatedItem = state.get('todos')
                        .get(itemIndex)
                        .set('editing', false);
    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function doneEditing(state, itemId, newText) {
    const itemIndex = findItemIndex(state, itemId);
    const updatedItem = state.get('todos')
                        .get(itemIndex)
                        .set('editing', false)
                        .set('text', newText);
    return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

export default function(state = Map(), action) {
    switch (action.type) {
        case 'SET_STATE':
            return setState(state, action.state);
        case 'TOGGLE_COMPLETE':
            return toggleComplete(state, action.itemId);
        case "CHANGE_FILTER":
            return changeFilter(state, action.filter);
        case "EDIT_ITEM":
            return editItem(state, action.itemId);
        case "CANCEL_EDITING":
            return cancelEditing(state, action.itemId);
        case "DONE_EDITING":
            return doneEditing(state, action.itemId, action.newText);
    }
    return state;
}

// action creators are functions that return a formatted action object
// to be dispatched by a component and consumed by a reducer

// note that in ES6, the colon & value can be omitted for a key 
// when the value would be the same as the key, ie:
// you can omit the property value if the key matches the variable name
export function toggleComplete(itemId) {
    return {
        type: "TOGGLE_COMPLETE",
        itemId
    }
}
export function changeFilter(filter) {
    return {
        type: "CHANGE_FILTER",
        filter
    }
}
export function editItem(itemId) {
    return {
        type: "EDIT_ITEM",
        itemId
    }
}
export function cancelEditing(itemId) {
    return {
        type: "CANCLE_EDITING",
        itemId
    }
}
export function doneEditing(itemId, newText) {
    return {
        type: "DONE_EDITING",
        itemId,
        newText
    }
}
import React from 'react';
import TodoList from './TodoList';
import TodoTools from './TodoTools';
// connects the component to the redux store
import {connect} from 'react-redux';
// get the action creators to connect the component to the reducer to the store
import * as actionCreators from '../action_creators';

export class TodoApp extends React.Component {
    getNbActiveItems() {
        if (this.props.todos) {
            const activeItems = this.props.todos.filter(
                (item) => item.get('status') === 'active'
            );
            return activeItems.size;
        }
        return 0;
    }
    render() {
        // was: <TodoList todos={this.props.todos} filter={this.props.filter} />
        // the spread operator on this.props auto-enumerates whatever member values are on the object
        // passed into the instatiation of the component automagically as props. 
        // Here, the mapStateToProps() function is pushing an object containing todos & filter  
        return <div>
            <section className="todoapp">
                <TodoList {...this.props} />
                <TodoTools changeFilter={this.props.changeFilter}
                           filter={this.props.filter}
                           nbActiveItems={this.getNbActiveItems()} />
            </section>
        </div>
    }
};
// fetches the todo & filter values from the redux store
// (which it gets access to by being passed into the connect method from react-redux),
// then the connect function returns a function that's closed over these state values,
// and takes the desired react component to render as an argument, to which
// the function passes in(?) the state values as prop values
function mapStateToProps(state) {
    return {
        todos: state.get('todos'),
        filter: state.get('filter')
    };
}
// passing in actionCreators to connect(), has the effect of mapping all of the 
// actionCreator functions as props of the same name
export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp);
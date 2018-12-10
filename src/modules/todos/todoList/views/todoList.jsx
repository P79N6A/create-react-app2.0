import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./todoItem";
import { connect } from "react-redux";
import { toggleTodo, removeTodo } from "../funcs/actions";
import { filterTypes, reducerName as filterReducer } from "../../todoFilter";
import { REDUCER_NAME as todosReducer } from "../funcs/constants";

const TodoList = ({ todos, onToggleTodo, onRemoveTodo }) => {
    return (
        <ul className="todo-list">
            {todos.map(item => (
                <TodoItem
                    key={item.id}
                    text={item.text}
                    completed={item.completed}
                    onToggle={() => onToggleTodo(item.id)}
                    onRemove={() => onRemoveTodo(item.id)}
                />
            ))}
        </ul>
    );
};

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    onToggleTodo: PropTypes.func,
    onRemoveTodo: PropTypes.func
};

const selectVisableTodos = (todos = [], filter = "all") => {
    switch (filter) {
        case filterTypes.ALL:
            return todos;
        case filterTypes.COMPLETED:
            return todos.filter(item => item.completed);
        case filterTypes.UNCOMPLETED:
            return todos.filter(item => !item.completed);
        default:
            throw new Error("unsupported filter");
    }
};

const mapStateToProps = state => {
    return {
        todos: selectVisableTodos(state[todosReducer], state[filterReducer])
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleTodo: id => {
            dispatch(toggleTodo(id));
        },
        onRemoveTodo: id => {
            dispatch(removeTodo(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

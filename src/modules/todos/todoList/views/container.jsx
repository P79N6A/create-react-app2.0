import React from "react";
import AddTodo from "./addTodo";
import TodoList from "./todoList";

import "../styles/style.less";

const Todos = () => {
    return (
        <div className="todos">
            <AddTodo />
            <TodoList />
        </div>
    );
};

export default Todos;

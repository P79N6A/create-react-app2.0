import React from "react";
import { view as Filter, reducer as filterReducer, reducerName as filterReducerName } from "modules/todos/todoFilter";
import { view as Todos, reducer as todosReducer, reducerName as todosReducerName } from "modules/todos/todoList";
import store, { injectAsyncReducer, resetAsyncReducer, sagaMiddleware } from "commons/store";

// resetAsyncReducer(store);
injectAsyncReducer(store, filterReducerName, filterReducer);
injectAsyncReducer(store, todosReducerName, todosReducer);

function Todo() {
    document.title = "ISC-GUI Todos";
    return (
        <div>
            <Todos />
            <Filter />
        </div>
    );
}

export default Todo;

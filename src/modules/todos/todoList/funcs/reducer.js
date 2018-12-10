import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = [];

const todo = {
    [ADD_TODO](state, action) {
        return [
            {
                id: action.id,
                text: action.text,
                completed: action.completed
            },
            ...state
        ];
    },
    [TOGGLE_TODO](state, action) {
        return state.map(item => {
            if (item.id === action.id) {
                return {
                    ...item,
                    completed: !item.completed
                };
            } else {
                return item;
            }
        });
    },
    [REMOVE_TODO](state, action) {
        return state.filter(item => {
            return item.id !== action.id;
        });
    }
};

const todoReducer = createReducer(initialState, Object.assign({}, todo));

export default todoReducer;

import {
    MESSAGE_INFO,
    MESSAGE_WARN,
    MESSAGE_ERROR,
    MESSAGE_SUCCESS,
    MESSAGE_READ,
    MESSAGE_CLEAR,
    MESSAGE_MUTE
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";
import _ from "lodash";

const initialConfig = {
    mute: false,
    muteDuration: 10 * 60 * 1000,
    maxDisplay: 3,
    autoHideDuration: 6000
};

const initialState = {
    config: initialConfig,
    messages: []
};

let zIndex = -1;

const addMessage = (state, action) => {
    zIndex++;
    if (state.config && state.config.mute) {
        return { ...state };
    } else {
        return {
            ...state,
            messages: [
                {
                    id: action.id,
                    message: action.message,
                    source:action.source,
                    unread: action.unread,
                    type: action.messageType,
                    zIndex: zIndex + 1
                },
                ...state.messages
            ]
        };
    }
};

const message = {
    [MESSAGE_INFO](state, action) {
        return addMessage(state, action);
    },
    [MESSAGE_WARN](state, action) {
        return addMessage(state, action);
    },
    [MESSAGE_ERROR](state, action) {
        return addMessage(state, action);
    },
    [MESSAGE_SUCCESS](state, action) {
        return addMessage(state, action);
    },
    [MESSAGE_READ](state, action) {
        let messages = _.map(state.messages, item => {
            if (item.id === action.id) {
                return {
                    ...item,
                    unread: !item.unread
                };
            } else {
                return item;
            }
        });
        return { ...state, messages };
    },
    [MESSAGE_CLEAR](state, action) {
        let messages = _.filter(state.messages, ["unread", true]);
        zIndex = messages.length ? zIndex : -1;
        return { ...state, messages };
    },
    [MESSAGE_MUTE](state, action) {
        const duration = action.duration ? action.duration : initialConfig.muteDuration;
        return { ...state, config: { ...state.config, mute: action.mute, duration } };
    }
};

const messageReducer = createReducer(initialState, Object.assign({}, message));

export default messageReducer;

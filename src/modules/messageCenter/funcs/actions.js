import {
    MESSAGE_INFO,
    MESSAGE_WARN,
    MESSAGE_ERROR,
    MESSAGE_SUCCESS,
    MESSAGE_READ,
    MESSAGE_CLEAR,
    MESSAGE_MUTE
} from "./actionTypes";
import { SUCCESS, INFO, ERROR, WARN } from "./constants";

let nextMsgId = 0;

export const success = (message, source) => ({
    type: MESSAGE_SUCCESS,
    source,
    message,
    id: nextMsgId++,
    unread: true,
    messageType: SUCCESS
});

export const error = (message, source) => ({
    type: MESSAGE_ERROR,
    source,
    message,
    id: nextMsgId++,
    unread: true,
    messageType: ERROR
});

export const warn = (message, source) => ({
    type: MESSAGE_WARN,
    source,
    message,
    id: nextMsgId++,
    unread: true,
    messageType: WARN
});

export const info = (message, source) => ({
    type: MESSAGE_INFO,
    source,
    message,
    id: nextMsgId++,
    unread: true,
    messageType: INFO
});

export const read = id => ({
    type: MESSAGE_READ,
    id: id
});

export const clear = id => ({
    type: MESSAGE_CLEAR,
    id: id
});

export const mute = (mute, duration) => ({
    type: MESSAGE_MUTE,
    mute,
    duration: typeof duration === "number" ? duration : undefined
});

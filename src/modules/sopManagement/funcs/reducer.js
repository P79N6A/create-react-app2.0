import {
    SOP_INIT_DATA,
    SOP_LIST_QRQUEST_SUCCESS,
    SOP_LIST_SEARCH_CHANGE,
    SOP_LIST_SELECT_SOP,
    SOP_ADD_CHANGE,
    SOP_COLUMN_LIST,
    SOP_EDITOR_CONTROL_PROPS,
    SOP_MESSAGE,
    SOP_GET_SOP_MANAGMENT_SCHEMA_SUCCESS
} from "./actionTypes";
import createReducer from "commons/utils/reducerHelper";

const initialState = {
    pagination: {
        limit: 10,
        currentpage: 1,
        totalpages: 0,
        totalrecords: 0
    },
    rowsPerPageOptions: [3, 10, 20, 50, 100, 200],
    columnDatas: [
        {
            label: "Multiple Select",
            indexKey: "multipleSelect",
            show: true
        },
        {
            label: "Alarm Type",
            indexKey: "alarmtype",
            show: true
        },
        {
            label: "Process Definition Id",
            indexKey: "processdefinitionid",
            show: true
        },
        {
            label: "Start Time",
            indexKey: "starttime",
            show: true
        },
        {
            label: "End Time",
            indexKey: "endtime",
            show: true
        },
        {
            label: "Action",
            indexKey: "action",
            show: true
        }
    ],
    loading: true,
};
const sop = {
    [SOP_INIT_DATA](state, action) {
        // console.log(state);
        // console.log(action);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                columnDatas: action.data.columnDatas,
                filterConfig: action.data.filterConfig,
                orderBy: action.data.orderBy,
                orderDirection: action.data.orderDirection,
                rowsPerPageOptions: action.data.rowsPerPageOptions, 
            },
        };
    },
    [SOP_LIST_QRQUEST_SUCCESS](state, action) {
        // console.log(action);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                sops: action.result.sops,
                pagination: {
                    limit: action.result.pagination.limit,
                    currentpage: action.result.pagination.currentpage,
                    totalpages: action.result.pagination.totalpages,
                    totalrecords: action.result.pagination.totalrecords
                },
                pageLimit: action.result.pagination.limit,
                refresh: false,
                seleted: [],
                sortLists: action.sortLists,
                sortorders: action.sortorders,
                orderBy: action.orderBy,
                orderDirection: action.orderDirection,
                orderDisplayName: action.orderDisplayName
            }
        };
    },
    [SOP_LIST_SEARCH_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                keyWord: action.keyWord
            }
        };
    },
    [SOP_LIST_SELECT_SOP](state, action) {
        return {
            ...state,
            selectSopList: action.item,
            open: true,
            edit: true,
            add: false,
            view: false
        };
    },
    [SOP_ADD_CHANGE](state, action) {
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                edit: false,
                add: true,
                view: false,
                open: true
            }
        };
    },
    [SOP_COLUMN_LIST](state, action) {
        // console.log("action", action);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                columnDatas: action.data,
                refresh: false
            }
        };
    },
    [SOP_EDITOR_CONTROL_PROPS](state, action) {
        // console.log("action", action);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                ...action.editorState
            }
        };
    },
    [SOP_MESSAGE](state, action) {
        // console.log("action", action);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                message: action.message
            }
        };
    },
    [SOP_GET_SOP_MANAGMENT_SCHEMA_SUCCESS](state, action) {
        // console.log("SOP_GET_SOP_MANAGMENT_SCHEMA_SUCCESS", action);
        return {
            ...state,
            [action.identify]: {
                ...state[action.identify],
                identify: action.identify,
                [action.schemaType]: action.configs
            }
        };
    },

};
// console.log(sop);
const sopReducer = createReducer(initialState, Object.assign({}, sop));

export default sopReducer;

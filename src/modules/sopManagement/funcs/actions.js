import {
    SOP_INIT_DATA,
    SOP_LIST_QRQUEST,
    SOP_LIST_QRQUEST_SUCCESS,
    SOP_LIST_SEARCH_CHANGE,
    SOP_LIST_PAGINATIONCHANGE_CHANGE,
    SOP_LIST_SELECT_SOP,
    SOP_ADD_NEW_SOPS,
    SOP_ADD_NEW_FLOW_FILE,
    SOP_ADD_CHANGE,
    SOP_LIST_DELET,
    SOP_EDIT_SOPS,
    SOP_COLUMN_LIST,
    SOP_EDITOR_CONTROL_PROPS,
    SOP_MESSAGE,
    SOP_GET_SOP_MANAGMENT_SCHEMA,
    SOP_GET_SOP_MANAGMENT_SCHEMA_SUCCESS
    // SOP_SORT_CHANGE
} from "./actionTypes";
export const getSopsInitData = (identify, data) => ({
    type: SOP_INIT_DATA,
    identify: identify,
    data
    // identify: identify,
    // keyWord: keyWord,
    // pagination: pagination
});
export const searchSopListQequest = (identify, keyWord, sortorders, sortLists, orderDirection, orderDisplayName, orderBy, pagination) => ({
    type: SOP_LIST_QRQUEST,
    identify: identify,
    keyWord: keyWord,
    pagination: pagination,
    sortorders: sortorders,
    sortLists: sortLists,
    orderDirection: orderDirection,
    orderDisplayName: orderDisplayName,
    orderBy: orderBy
});
export const searchSopListQequestSuccess = (identify, result, sortLists, sortorders, orderDirection, orderDisplayName, orderBy) => ({
    type: SOP_LIST_QRQUEST_SUCCESS,
    identify,
    result,
    sortLists,
    sortorders,
    orderDirection,
    orderDisplayName,
    orderBy
});
export const searchWordChang = (identify, keyWord) => ({
    type: SOP_LIST_SEARCH_CHANGE,
    identify,
    keyWord
});
export const paginationChange = (identify, action) => ({
    type: SOP_LIST_PAGINATIONCHANGE_CHANGE,
    identify,
    action
});
export const selectSops = item => ({
    type: SOP_LIST_SELECT_SOP,
    item
});
export const addNewSops = (identify, fromData) => ({
    type: SOP_ADD_NEW_SOPS,
    fromData
});
export const editSops = (identify, fromData) => ({
    type: SOP_EDIT_SOPS,
    identify, 
    fromData
});
export const getFlowFile = (identify, file) => ({
    type: SOP_ADD_NEW_FLOW_FILE,
    identify,
    file
});
export const changeAdd = identify => ({
    type: SOP_ADD_CHANGE,
    identify,
    add: true
});
export const deletSop = (identify, data) => ({
    type: SOP_LIST_DELET,
    identify,
    data
});
export const columnsChanged = (identify, data) => ({
    type: SOP_COLUMN_LIST,
    identify,
    data
});
export const editorControlProps = (identify, editorState) => ({
    type: SOP_EDITOR_CONTROL_PROPS,
    identify,
    editorState
});
export const messageInfo = (identify, message) => ({
    type: SOP_MESSAGE,
    identify,
    message
});
export const getSopManagmentSchema = (identify, siteName, schemaType) => ({
    type: SOP_GET_SOP_MANAGMENT_SCHEMA,
    identify,
    siteName,
    schemaType
});
export const getSopManagmentSchemaSuccess = (identify, schemaType, configs) => ({
    type: SOP_GET_SOP_MANAGMENT_SCHEMA_SUCCESS,
    identify,
    schemaType,
    configs
});



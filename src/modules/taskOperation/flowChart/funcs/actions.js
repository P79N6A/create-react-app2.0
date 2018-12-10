import {
    WORKFLOW_REQUEST,
    WORKFLOW_UPDATE,
    WORKFLOW_TASK_LIST,
    WORKFLOW_TASK_LIST_SUCCESS
} from "./actionTypes";

export const getWorkflowGraph = (identify, processdefinitionid) => ({
    type: WORKFLOW_REQUEST,
    identify,
    processdefinitionid
});
export const updateWorkflow = (identify, payload) =>({
    type: WORKFLOW_UPDATE,
    identify,
    payload
});
export const getCurrentTaskList = (identify, payload) =>({
    type: WORKFLOW_TASK_LIST,
    identify,
    payload
});
export const currentTaskListSuccess = (identify, payload) =>({
    type: WORKFLOW_TASK_LIST_SUCCESS,
    identify,
    payload
});

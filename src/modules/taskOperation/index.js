import * as actions from "./task/funcs/actions";
import reducer from "./task/funcs/reducer";
import {REDUCER_NAME} from "./task/funcs/constants";
import view from "./task/views/container";
import sagas from "./task/funcs/sagas";

// import {
//     reducer as messageReducer,
//     reducerName as messageReducerName
// } from "modules/messageCenter";
// import {
//     sagas as currentTaskSagas,
//     reducer as currentTaskReducer,
//     reducerName as currentTaskReducerName
// } from "modules/taskOperation/currentTask";

// import {
//     sagas as recordListPageSagas,
//     reducer as recordListPageReducer,
//     reducerName as recordListPageReducerName
// } from "modules/taskOperation/recordList";

// import {
//     sagas as attachmentsSagas,
//     reducer as attachmentsReducer,
//     reducerName as attachmentsReducerName
// } from "modules/taskOperation/attachments";

// import {
//     sagas as flowChartSagas,
//     reducer as flowChartReducer,
//     reducerName as flowChartReducerName
// } from "modules/taskOperation/flowChart";

import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";

// sagaMiddleware.run(currentTaskSagas);
// sagaMiddleware.run(recordListPageSagas);
// sagaMiddleware.run(attachmentsSagas);
// sagaMiddleware.run(flowChartSagas);
sagaMiddleware.run(sagas);

// injectAsyncReducer(store, currentTaskReducerName, currentTaskReducer);
// injectAsyncReducer(store, recordListPageReducerName, recordListPageReducer);
// injectAsyncReducer(store, messageReducerName, messageReducer);
// injectAsyncReducer(store, attachmentsReducerName, attachmentsReducer);
// injectAsyncReducer(store, flowChartReducerName, flowChartReducer);
injectAsyncReducer(store, REDUCER_NAME, reducer);

export {
    actions,
    reducer,
    view,
    sagas,
    REDUCER_NAME as reducerName
};
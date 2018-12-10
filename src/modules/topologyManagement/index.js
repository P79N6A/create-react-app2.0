import * as actions from "./topologyMgmtGrid/funcs/actions";
import reducer from "./topologyMgmtGrid/funcs/reducer";
import { REDUCER_NAME } from "./topologyMgmtGrid/funcs/constants";
import view from "./topologyMgmtGrid/views/container";
import sagas from "./topologyMgmtGrid/funcs/sagas";

import {
    sagas as topoFloatTabSagas,
    reducer as topoFloatTabReducer,
    reducerName as topoFloatTabReducerName
} from "modules/topologyManagement/topologyMgmtFloatTab";
import {
    sagas as topoFilterSagas,
    reducer as topoFilterReducer,
    reducerName as topoFilterReducerName
} from "modules/topologyManagement/topologyMgmtEnhanceFilter";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";

import { formatIconPath } from "./topologyMgmtFloatTab/funcs/iconsNew";

const visualEditer = true;
sagaMiddleware.run(topoFloatTabSagas);
sagaMiddleware.run(topoFilterSagas);
sagaMiddleware.run(sagas);
injectAsyncReducer(store, topoFloatTabReducerName, topoFloatTabReducer);
injectAsyncReducer(store, topoFilterReducerName, topoFilterReducer);
injectAsyncReducer(store, REDUCER_NAME, reducer);

export { actions, reducer, sagas, view, REDUCER_NAME as reducerName, visualEditer, formatIconPath };

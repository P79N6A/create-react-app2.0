import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import * as actions from "./alarmList/funcs/actions";
import reducer from "./alarmList/funcs/reducer";
import { REDUCER_NAME } from "./alarmList/funcs/constants";
import view from "./alarmList/views/container";
import sagas from "./alarmList/funcs/sagas";
import EditerView from "./alarmList/views/editerView";
const visualEditer = true;

injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleware.run(sagas);

export { actions, reducer, view, sagas, REDUCER_NAME as reducerName, visualEditer, EditerView as editerView };

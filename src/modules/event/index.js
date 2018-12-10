import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import * as actions from "./eventList/funcs/actions";
import reducer from "./eventList/funcs/reducer";
import { REDUCER_NAME } from "./eventList/funcs/constants";
import view from "./eventList/views/container";
import sagas from "./eventList/funcs/sagas";
import EditerView from "./eventList/views/editerView";
const visualEditer = true;

injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleware.run(sagas);

export { actions, reducer, view, sagas, REDUCER_NAME as reducerName, visualEditer, EditerView as editerView };

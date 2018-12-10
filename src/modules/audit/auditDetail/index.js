import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import * as actions from "./funcs/actions";
import reducer from "./funcs/reducer";
import { REDUCER_NAME } from "./funcs/constants";
import view from "./views/container";
import sagas from "./funcs/sagas";

injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleware.run(sagas);

export { actions, reducer, view, sagas, REDUCER_NAME as reducerName };

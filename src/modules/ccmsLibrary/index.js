import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import * as actions from "./funcs/actions";
import reducer from "./funcs/reducers";
import { REDUCER_NAME } from "./funcs/constants";
import View from "./views/container";
import sagas from "./funcs/sagas";

injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleware.run(sagas);

export { actions, View as view };

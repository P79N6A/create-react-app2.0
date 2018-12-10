import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import Container from "./views/container";
import reducers from "./funcs/reducers";
import sagas from "./funcs/sagas";
import * as actions from "./funcs/actions";
import { REDUCER_NAME } from "./funcs/constants";
// import
injectAsyncReducer(store, REDUCER_NAME, reducers);
sagaMiddleware.run(sagas);

export { Container as view, actions };

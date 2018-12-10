import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import { REDUCER_NAME } from "./funcs/constants";
import Container from "./views/container";
import * as actions from "./funcs/actions";
import reducers from "./funcs/reducers";
import sagas from "./funcs/sagas";

injectAsyncReducer(store, REDUCER_NAME, reducers);
sagaMiddleware.run(sagas);

export { Container as view, actions, REDUCER_NAME };

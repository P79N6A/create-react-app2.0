import view from "./views/login";
import authorization from "./views/authorization";
import sagas from "./funcs/sagas";
import * as actions from "./funcs/actions";
import reducer from "./funcs/reducer";
import { REDUCER_NAME } from "./funcs/constants";

// import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
// injectAsyncReducer(store, REDUCER_NAME, reducer);
// sagaMiddleware.run(sagas);

export { actions, reducer, view, sagas, authorization as Authorization, REDUCER_NAME as reducerName };

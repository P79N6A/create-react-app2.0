import reducer from "./funcs/reducer";
import sagas from "./funcs/sagas";
import SmsView from "./views/container";
import * as actions from "./funcs/actions";
import { REDUCER_NAME } from "./funcs/constants";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";

sagaMiddleware.run(sagas);
injectAsyncReducer(store,REDUCER_NAME, reducer);

export { SmsView, REDUCER_NAME as userReducerName, sagas, reducer as userReducer, actions as userActions };
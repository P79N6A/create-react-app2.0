import store, { injectAsyncReducer } from "commons/store";
import * as actions from "./funcs/actions";
import * as actionType from "./funcs/actionType";
import reducer from "./funcs/reducer";
import { REDUCERNAME } from "./funcs/constants";
import Transmitter from "./views/transmitter";

injectAsyncReducer(store, REDUCERNAME, reducer);
// sagaMiddleware.run(sagas);

export { actions, actionType, reducer, REDUCERNAME as reducerName, Transmitter };

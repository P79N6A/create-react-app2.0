// import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import WidgetsBoard from "./widgetsBoard/views/container";
import * as actions from "./widgetsBoard/funcs/actions";
import {
    REDUCER_NAME as reducerName,
    INITIAL_STATE as initialState,
    // REDUCER_NAME
} from "./widgetsBoard/funcs/constants";
import reducers from "./widgetsBoard/funcs/reducers";
import sagas from "./widgetsBoard/funcs/sagas";

// injectAsyncReducer(store, REDUCER_NAME, reducers);
// sagaMiddleware.run(sagas);

export { WidgetsBoard as view, reducerName, reducers, initialState, actions, sagas };

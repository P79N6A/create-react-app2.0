import * as actions from "./funcs/actions";
import reducer from "./funcs/reducer";
import {REDUCER_NAME} from "./funcs/constants";
import view from "./views/container";
import sagas from "./funcs/sagas";
import EditerView from "./views/editerView";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import {
    reducer as messageReducer,
    reducerName as messageReducerName
} from "modules/messageCenter";
const visualEditer = true;
sagaMiddleware.run(sagas);
injectAsyncReducer(store, REDUCER_NAME, reducer);
injectAsyncReducer(store, messageReducerName, messageReducer);
export {
    actions,
    reducer,
    view,
    sagas,
    visualEditer,
    REDUCER_NAME as reducerName,
    EditerView as editerView, 
};

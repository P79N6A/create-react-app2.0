
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import View from "./views/container";
import { REDUCER_NAME } from "./funcs/constant";
import reducer from "./funcs/reducer";
import saga from "./funcs/saga";

injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleware.run(saga);

export { View as view, REDUCER_NAME, reducer, saga };

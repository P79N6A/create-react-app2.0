import view from "./views/container";
import saga from "./funcs/saga";
import { REDUCER_NAME } from "./funcs/constants";
import reducer from "./funcs/reducer";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
injectAsyncReducer(store, REDUCER_NAME, reducer);
sagaMiddleware.run(saga);
export { view, saga as loggerSaga, REDUCER_NAME as loggerReducerName, reducer as loggerReducer };

import * as actions from "./funcs/actions";
import reducer from "./funcs/reducer";
import view from "./views/snackBars";
import { REDUCER_NAME } from "./funcs/constants";

import store, { injectAsyncReducer } from "commons/store";
injectAsyncReducer(store, REDUCER_NAME, reducer);

export { actions, reducer, view, REDUCER_NAME as reducerName };

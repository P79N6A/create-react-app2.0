import reducer from "./funcs/reducer";
import saga from "./funcs/saga";
import view from "./views/container";
import * as actions from "./funcs/actions";
import { REDUCER_NAME } from "./funcs/constants";

export {
    view as ResourcePathView,
    REDUCER_NAME as resourcePathReducerName,
    saga as resourcePathSaga,
    reducer as resourcePathReducer,
    actions as resourcePathActions
};

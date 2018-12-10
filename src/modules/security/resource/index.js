import reducer from "./funcs/reducer";
import saga from "./funcs/saga";
import view from "./views/container";
import * as actions from "./funcs/actions";
import { REDUCER_NAME } from "./funcs/constants";

export {
    view as ResourceView,
    REDUCER_NAME as resourceReducerName,
    saga as resourceSaga,
    reducer as resourceReducer,
    actions as resourceActions
};

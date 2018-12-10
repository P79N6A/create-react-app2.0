import reducer from "./funcs/reducer";
import saga from "./funcs/saga";
import view from "./views/container";
import * as actions from "./funcs/actions";
import { REDUCER_NAME } from "./funcs/constants";

export {
    view as RoleView,
    REDUCER_NAME as roleReducerName,
    saga as roleSaga,
    reducer as roleReducer,
    actions as roleActions
};

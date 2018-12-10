import reducer from "./funcs/reducer";
import saga from "./funcs/saga";
import view from "./views/container";
import * as actions from "./funcs/actions";
import { REDUCER_NAME } from "./funcs/constants";

export { view, REDUCER_NAME as userReducerName, saga as userSaga, reducer as userReducer, actions as userActions };

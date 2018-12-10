import * as actions from "./funcs/actions";
import reducer from "./funcs/reducer";
import {REDUCER_NAME} from "./funcs/constants";
import view from "./views/container";
import sagas from "./funcs/sagas";

export {
    actions,
    reducer,
    view,
    sagas,
    REDUCER_NAME as reducerName
};
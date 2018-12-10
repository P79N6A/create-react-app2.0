// import reducer from "./funcs/reducer";
// import saga from "./funcs/saga";
// import view from "./views/container";
// import * as actions from "./funcs/actions";
// import { REDUCER_NAME } from "./funcs/constants";

// export { view as userReducerName};


import * as actions from "./funcs/actions";
import reducer from "./funcs/reducer";
import { REDUCER_NAME } from "./funcs/constants";
import view from "./views/container";
import sagas from "./funcs/sagas";

export { actions, reducer, view, sagas, REDUCER_NAME as reducerName };
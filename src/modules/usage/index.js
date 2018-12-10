// import { view as UserView } from "./devices/index";
// import Usage from "./views/container";

// export { UserView, Usage as view };

import { REDUCER_NAME } from "./usage/funcs/constants";
import view from "./usage/views/container";
import reducer from "./usage/funcs/reducer";
import sagas from "./usage/funcs/sagas";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";

sagaMiddleware.run(sagas);
injectAsyncReducer(store,REDUCER_NAME, reducer);

export { view, REDUCER_NAME, sagas, reducer as reducerName };
// export { UserView, Usage as view };
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import { view as UserView, userReducerName, userSaga, userReducer } from "./user/index";
import { GroupView, groupSaga, groupReducerName, groupReducer } from "./group/index";
// import { RoleView, roleSaga, roleReducerName, roleReducer } from "./role/index";
import { ResourceView, resourceSaga, resourceReducerName, resourceReducer } from "./resource/index";
import {
    // ResourcePathView,
    resourcePathSaga,
    resourcePathReducerName,
    resourcePathReducer
} from "./resource_path/index";

import Security from "./views/container";

injectAsyncReducer(store, userReducerName, userReducer);
sagaMiddleware.run(userSaga);

injectAsyncReducer(store, groupReducerName, groupReducer);
sagaMiddleware.run(groupSaga);

// injectAsyncReducer(store, roleReducerName, roleReducer);
// sagaMiddleware.run(roleSaga);

injectAsyncReducer(store, resourceReducerName, resourceReducer);
sagaMiddleware.run(resourceSaga);

injectAsyncReducer(store, resourcePathReducerName, resourcePathReducer);
sagaMiddleware.run(resourcePathSaga);

export { UserView, GroupView, ResourceView, Security as view, groupReducerName };

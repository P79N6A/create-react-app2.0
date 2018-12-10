import React from "react";
import { view as View, loggerSaga, loggerReducerName, loggerReducer } from "modules/logger";
import store, { injectAsyncReducer, sagaMiddleware } from "../commons/store";

sagaMiddleware.run(loggerSaga);
injectAsyncReducer(store, loggerReducerName, loggerReducer);

function Logger() {
    return <View />;
}

export default Logger;

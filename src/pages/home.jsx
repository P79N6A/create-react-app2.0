import React from "react";
import store, { injectAsyncReducer, sagaMiddleware } from "commons/store";
import sagas, * as msg from "commons/utils/messageBus";
import { view as Navbar, reducer as navReducer, reducerName as navReducerName } from "../modules/navbar";
import {
    view as TopoReview,
    sagas as topoReSagas,
    reducer as topoReReducer,
    reducerName as topoReReducerName
} from "modules/topology";
import Permission from "commons/components/permissionComponent";
injectAsyncReducer(store, navReducerName, navReducer);
// sagaMiddleware.run();

sagaMiddleware.run(topoReSagas);
injectAsyncReducer(store, topoReReducerName, topoReReducer);
sagaMiddleware.run(sagas);
store.dispatch(msg.connect());

setTimeout(() => {
    store.dispatch(msg.subscribe("ABC", "ISC_MSG_BUS", "topologyTest01"));
}, 1500);

setTimeout(() => {
    store.dispatch(msg.publish("ABC", "ISC_MSG_BUS", [{ id: 123 }], "home"));
}, 3000);

// setTimeout(() => {
//     store.dispatch(msg.unsubscribe("ABC", "ISC_MSG_BUG"));
// }, 4500);

export const HomePage = () => {
    return (
        <div>
            <Navbar />
            <h2>Hello World</h2>
            <Permission materialKey="ISC_WEB_COMP_C_CCMS_DATAMNG_DATARESOURCE">
                <button>Has Access Right</button>
            </Permission>
            <Permission materialKey="ISC_WEB_COMP_NONE">
                <button>No Access Right</button>
            </Permission>
            <TopoReview />
        </div>
    );
};

export default HomePage;

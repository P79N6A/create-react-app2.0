import React from "react";
import store, { injectAsyncReducer, sagaMiddleware } from "../commons/store";
import {
    view as TopoReview,
    sagas as topoReSagas,
    reducer as topoReReducer,
    reducerName as topoReReducerName
} from "modules/topology";

sagaMiddleware.run(topoReSagas);
injectAsyncReducer(store, topoReReducerName, topoReReducer);

function Topo() {
    return (
        <TopoReview />
    );
}

export default Topo;

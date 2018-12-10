import React from "react";
import config from "./config/chart.json";
import { sagas, reducer as chartReducer, reducerName as chartReducerName, view as View } from "modules/charts";
import { Grid } from "modules/grid";
import store, { injectAsyncReducer, sagaMiddleware } from "../commons/store";

injectAsyncReducer(store, chartReducerName, chartReducer);
sagaMiddleware.run(sagas);

export const ChartDashboard = () => {
    return (
        <div>
            <Grid editMode={true} saveToLocal={true} id="HTOC" draggableCancel="input,select,textarea">
                <div key={config.first.ccmslayout.i}>
                    <View {...config.first} key={config.first.ccmslayout.i + "content"} />
                </div>
                <div key={config.second.ccmslayout.i}>
                    <View {...config.second} key={config.second.ccmslayout.i + "content"} />
                </div>
            </Grid>
        </div>
    );
};

export default ChartDashboard;

import React from "react";
import { 
    view as DeviceView
    // REDUCER_NAME as DeviceReducerName,
    // reducerName as DeviceReducer,
    // sagas as deviceSagas

}  from "modules/usage";



// import store, { injectAsyncReducer, sagaMiddleware } from "../commons/store";

// injectAsyncReducer(store, DeviceReducerName, DeviceReducer);
// sagaMiddleware.run(deviceSagas);


class PageHello extends React.Component {
    render() {
        return (
            <div>
                <DeviceView />
            </div>
        );
    }
}

export default PageHello;
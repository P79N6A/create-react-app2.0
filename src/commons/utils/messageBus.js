/*
 * =========================================================================
 *  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
 *
 *  This software is confidential and proprietary to NCS Pte. Ltd. You shall
 *  use this software only in accordance with the terms of the license
 *  agreement you entered into with NCS.  No aspect or part or all of this
 *  software may be reproduced, modified or disclosed without full and
 *  direct written authorisation from NCS.
 *
 *  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
 *  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
 *  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
 *  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
 *  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 *
 *  =========================================================================
 */
/**
 * Created by Zach on 25/05/2018.
 */

import ReconnectingWebSocket from "reconnecting-websocket";
import { takeEvery, fork } from "redux-saga/effects";
import { TOKEN_KEY, MSG_BUS_HEARTBEAT_INTERVAL } from "../constants/const";
import tokenHelper from "./tokenHelper";
import store from "../store";
import getUrl from "commons/utils/urlHelper";

//#region action types
export const CONNECT_WEBSOCKET = "ISC/CONNECT_WEBSOCKET";
export const DISCONNECT_WEBSOCKET = "ISC/DISCONNECT_WEBSOCKET";
export const PUBLISH_MESSAGE = "ISC/PUBLISH_MESSAGE";
export const SUBSCRIBE_MESSAGE = "ISC/SUBSCRIBE_MESSAGE";
export const UNSUBSCRIBE_MESSAGE = "ISC/UNSUBSCRIBE_MESSAGE";
export const RECIEVED_MESSAGE = "ISC/RECIEVED_MESSAGE";
export const PUBLISH_APPLICATION = "ISC/PUBLISH_APPLICATION";
//#endregion #region actions
export const connect = (topic, args) => ({ type: CONNECT_WEBSOCKET });
export const disconnect = reason => ({ type: DISCONNECT_WEBSOCKET, reason });
export const publish = (topic, category, args, streamid, appid) => ({
    type: PUBLISH_MESSAGE,
    topic,
    category,
    args,
    streamid,
    appid
});
// export const publishApplication = (topic, category, applicationid, update, streamid) => {
//     return {
//         type: PUBLISH_APPLICATION,
//         topic,
//         category,
//         applicationid,
//         update,
//         streamid
//     };
// };
export const subscribe = (topic, category, streamid) => ({ type: SUBSCRIBE_MESSAGE, topic, category, streamid });
export const unsubscribe = (topic, category, streamid) => ({ type: UNSUBSCRIBE_MESSAGE, topic, category, streamid });
export const recievedMessage = payload => ({ type: RECIEVED_MESSAGE, payload });
//#endregion #region websocket connection
let options = {
    maxRetries: 5
};

let missedHeartbeats = 0;

let rws = null;
let heartbeatInterval = null;

async function initWebsocket() {
    let urls = await getUrl();
    let url = urls.messageBus;
    rws = new ReconnectingWebSocket(url, [], options);

    rws.addEventListener("open", async () => {
        let token = tokenHelper.get();
        let ticket = {
            "header-category": "ISC_MSG_BUS",
            streamid: "messageBus"
        };
        if (token) {
            ticket[TOKEN_KEY] = token;
        }
        if (rws.readyState === 1) {
            rws.send(JSON.stringify(ticket));
        }
        store.dispatch(subscribe("ISC_MSG_BUS", "ISC_MSG_BUS", "messageBus"));
        store.dispatch(subscribe("ISCAlarms", "ISCAlarms"));
        store.dispatch(subscribe("ISCEvents", "ISCEvents"));
        // store.dispatch(subscribe("ISC_LOGGER", "ISC_LOGGER"));
        // store.dispatch(subscribe("ISCResources", "ISCResources"));  disable iscresources
        store.dispatch(subscribe("ISCAlarmsEdit", "ISCAlarmsEdit"));
        store.dispatch(subscribe("ISCAlarmsDelete", "ISCAlarmsDelete"));
        store.dispatch(subscribe("ISCBpm", "ISCBpm"));
        store.dispatch(subscribe("DevicePropertiesUpdate", "DevicePropertiesUpdate"));
        store.dispatch(subscribe("ISCAoi", "ISCAoi"));
        store.dispatch(subscribe("ISC3D", "ISC3D"));
        let inv = MSG_BUS_HEARTBEAT_INTERVAL;
        if (heartbeatInterval === null && inv > 0) {
            missedHeartbeats = 0;
            clearInterval(heartbeatInterval);
            heartbeatInterval = setInterval(function() {
                try {
                    missedHeartbeats++;
                    if (missedHeartbeats >= 3) {
                        throw new Error("Too many missed heartbeats.");
                    }
                    if (rws.readyState === 1) {
                        rws.send(JSON.stringify(ticket));
                        missedHeartbeats = 0;
                    }
                } catch (e) {
                    clearInterval(heartbeatInterval);
                    heartbeatInterval = null;
                    console.warn("Closing connection. Reason: " + e.message);
                    rws.close();
                }
            }, inv);
        }
    });

    rws.addEventListener("message", e => {
        if (e.data) {
            missedHeartbeats = 0;
            let msg = JSON.parse(e.data);
            if (msg && msg.status.code === "00000000" && msg.data) {
                store.dispatch(recievedMessage(msg));
            }
        }
    });

    rws.addEventListener("error", e => {
        console.error(e.message);
    });

    rws.addEventListener("close", () => {
        console.info("Message bus disconnected.");
    });
}

//#endregion #region sagas

function callConnect() {
    if (!rws) {
        initWebsocket();
    }
}

function callDisconnect({ reason }) {
    if (rws) {
        clearInterval(heartbeatInterval);
        rws.close(1000, reason);
    }
}

function callPublish({ topic, category, args, appid, streamid }) {
    if (typeof topic === "string") {
        topic = topic.replace(/ /g, "000");
    }
    let token = tokenHelper.get();
    var sd = {
        Method: "publish",
        Topic: topic,
        data: args,
        "header-category": category
    };
    if (streamid) {
        sd = Object.assign(sd, {
            streamid: streamid
        });
    }
    if (appid) {
        sd = Object.assign({}, sd, {
            update: true,
            data: [args],
            "header-category": category,
            "header-applicationid": appid
        });
    }
    if (token && rws.readyState === 1) {
        sd[TOKEN_KEY] = token;
        let msg = JSON.stringify(sd);
        rws.send(msg);
    }
}

// function callPublishApp({ topic, category, applicationid, update, streamid }) {
//     if (typeof topic === "string") {
//         topic = topic.replace(/ /g, "000");
//     }
//     let token = tokenHelper.get();
//     var sd = {
//         Method: "publish",
//         Topic: topic,
//         "header-category": category,
//         "header-applicationid": applicationid,
//         update
//     };
//     if (streamid) {
//         sd = Object.assign(sd, {
//             streamid: streamid
//         });
//     }
//     if (token && rws.readyState === 1) {
//         sd[TOKEN_KEY] = token;
//         let msg = JSON.stringify(sd);
//         rws.send(msg);
//     }
// }

function callSubscribe({ topic, category, streamid }) {
    if (typeof topic !== "string") {
        topic = topic.replace(/ /g, "000");
    }
    let token = tokenHelper.get();

    var sd = {
        Method: "subscribe",
        Topic: topic,
        "header-category": category
    };
    if (streamid) {
        sd = Object.assign(sd, {
            streamid: streamid
        });
    }
    if (token && rws.readyState === 1) {
        sd[TOKEN_KEY] = token;
        rws.send(JSON.stringify(sd));
    }
}

function callUnsubscribe({ topic, category, streamid }) {
    if (typeof topic !== "string") {
        topic = topic.replace(/ /g, "000");
    }
    let token = tokenHelper.get();

    var sd = {
        Method: "unsubscribe",
        Topic: topic,
        "header-category": category
    };
    if (streamid) {
        sd = Object.assign(sd, {
            streamid: streamid
        });
    }
    if (token && rws.readyState === 1) {
        sd[TOKEN_KEY] = token;
        rws.send(JSON.stringify(sd));
    }
}

function* connectSaga() {
    yield takeEvery(CONNECT_WEBSOCKET, callConnect);
}

function* disconnectSaga() {
    yield takeEvery(DISCONNECT_WEBSOCKET, callDisconnect);
}

// function* publishAppSaga() {
//     yield takeEvery(PUBLISH_APPLICATION, callPublishApp);
// }

function* publishSaga() {
    yield takeEvery(PUBLISH_MESSAGE, callPublish);
}

function* subscribeSaga() {
    yield takeEvery(SUBSCRIBE_MESSAGE, callSubscribe);
}

function* unsubscribeSaga() {
    yield takeEvery(UNSUBSCRIBE_MESSAGE, callUnsubscribe);
}

export default function* root() {
    yield [
        fork(connectSaga),
        fork(disconnectSaga),
        fork(publishSaga),
        fork(subscribeSaga),
        fork(unsubscribeSaga) /*, fork(publishAppSaga)*/
    ];
}

//#endregion

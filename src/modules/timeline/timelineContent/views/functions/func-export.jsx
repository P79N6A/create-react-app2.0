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
 * Created by kaidi on 25/06/2018.
 */

import { Component } from "react";
import { connect } from "react-redux";
import { REDUCER_NAME as timelineReducerName } from "../../funcs/constants";
// import { exportEventAlarmDataRequest } from "modules/charts/funcs/actions";

export class ExportComps extends Component {
    static propTypes = {};
    state = {};

    componentWillReceiveProps(nextProps) {
        let { exportData } = nextProps;
        if (!exportData) {
            return;
        }
        this.exportCSV(nextProps);
        // this.callExport(nextProps);
    }
    
    exportCSV(nextProps) {
        let { title, exportData } = nextProps;
        title = "Timeline";
        if (!exportData) {
            return;
        }
        var odownLoad = document.createElement("a");
        let browserType = this.checkBrowser();
        if (browserType === "IE" || browserType === "Edge") {
            odownLoad.href = "#";
            odownLoad.click();
            this.downloadFile(title + "-Alarm-Data.xls", exportData);
        } else {
            odownLoad.href = "data:application/octet-stream;charset=utf-8;base64," + exportData;
            odownLoad.download = title + "-Alarm-Data.xls";
            odownLoad.click();
            odownLoad.remove();
        }
    }

    checkBrowser() {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Trident") > -1) {
            return "IE";
        } else if (userAgent.indexOf("Edge") > -1) {
            return "Edge";
        } else {
            return "Other";
        }
    }

    downloadFile(fileName, data) {
        var content = "data:application/octet-stream;charset=utf-8;base64," + data;
        var blob = this.getBlob(content);
        window.navigator.msSaveBlob(blob, fileName);
    }
    getBlob(base64) {
        var contentType = "application/octet-stream";
        return this.b64toBlob(this.getData(base64), contentType);
    }
    getData(base64) {
        return base64.substr(base64.indexOf("base64,") + 7, base64.length);
    }

    b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || "";
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    render() {
        return null;
    }
}

// const mapStateToProps = (state, ownProps) => {
//     let identify = ownProps.identify;
//     let store = state[reducerName] && state[reducerName][identify];
//     return {
//         // exportInfo: state[widgetsBoardReducerName] && state[widgetsBoardReducerName]["exportData"],
//         predicates: store && store.predicates,
//         source: store && store.source,
//         exportData: store && store.exportData,
//         title: store && store.title
//     };
// };
const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify;
    return {
        exportData: filterProps(state, identify, timelineReducerName, "exportData"),
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         exportEventAlarmData: (identify, source, columninfos, iotIds, dateRange, readings) => {
//             dispatch(exportEventAlarmDataRequest(identify, source, columninfos, iotIds, dateRange, readings));
//         }
//     };
// };

export default connect(
    mapStateToProps,
    null
)(ExportComps);

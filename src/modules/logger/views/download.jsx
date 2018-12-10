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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../funcs/action";
import { REDUCER_NAME } from "../funcs/constants";
class Download extends React.Component {
    state = {};
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
    componentWillReceiveProps(nextProps) {
        const { moduleChild, downloadfile = [] } = nextProps;
        var odownLoad = document.createElement("a");
        if (downloadfile && downloadfile.length) {
            let filename = downloadfile[1].headers.get("Content-Disposition");
            if (filename) {
                try {
                    filename = filename
                        .split(";")
                        .find(n => ~n.indexOf("filename"))
                        .split("=")[1];
                } catch (error) {
                    filename = "";
                }
            }
            let browserType = this.checkBrowser();
            if (browserType === "IE" || browserType === "Edge") {
                // odownLoad.href = "#";
                odownLoad.click();
                this.downloadFile(filename || moduleChild + ".log", downloadfile[0]);
            } else {
                odownLoad.href = URL.createObjectURL(downloadfile[0]);
                odownLoad.download = filename || moduleChild + ".log";
                odownLoad.click();
                odownLoad.remove();
            }
            this.props.reset({ downloadfile: [] });
        }
    }
    downloadFile(fileName, bold) {
        window.navigator.msSaveBlob(bold, fileName);
    }
    render() {
        return null;
    }
}
Download.propTypes = {
    classes: PropTypes.object
};
Download.defaultProps = {};
const mapStateToProps = state => {
    return {
        moduleChild: state[REDUCER_NAME] && state[REDUCER_NAME].moduleChild,
        criteria: state[REDUCER_NAME] && state[REDUCER_NAME].criteria,
        downloadfile: state[REDUCER_NAME] && state[REDUCER_NAME].downloadfile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        publishMSG: (topic, category, args, streamid) => {
            dispatch(actions.publishMSG(topic, category, args, streamid));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Download);

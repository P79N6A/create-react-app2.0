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
 * Created by Chen Ling on 15/10/2018.
 */
import React, { Component } from "react";
// import PropTypes from "prop-types";
import $ from "jquery";
import FileCard from "./fileCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: ""
        };
    }
    selectFile = (event) => {
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        if (this.props.isUploadFile) {
            $("#bpmFile").trigger("click");
        }
    };
    handleFile = event => {
        // console.log("handleFile")
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        let file = event.currentTarget.files;

        if (file.length === 0) return;
        this.setState({
            fileName: file[0].name
        });
        // this.regFile(file);
        this.props.uploadFile(file[0]);
    };
    filterFileAll = () => {
        this.props.filterFileAll();
    };
    render() {
        // console.log(this.props.loading);
        // console.log(this.props.fileList);
        return (
            <div
                className={this.props.isUploadFile ? "attachmentsContainer" : "attachmentsContainer defalut"}
                onClick={this.filterFileAll.bind(this)}
            >
                <div className={Object.keys(this.props.recordData).length > 0 ? "upload" : "upload-deafult"}>
                    {Object.keys(this.props.recordData).length > 0 ? (
                        <p className="fileDescription">
                            Filter by task Description: {this.props.recordData.name}. Data time:{" "}
                            {moment(this.props.recordData.enddate).format("YYYY-MM-DD HH:mm:ss")} click on any other
                            place to clear filter.
                        </p>
                    ) : null}
                    <p style={{ minWidth: "30px", textAlign: "right" }}>
                        <i className="material-icons" onClick={this.selectFile.bind(this)}>
                            cloud_upload
                            <input
                                style={{ display: "none" }}
                                id="bpmFile"
                                type="file"
                                data-open-file
                                onChange={this.handleFile}
                            />
                        </i>
                    </p>
                </div>

                {this.props.fileList !== undefined && this.props.fileList.length > 0 ? (
                    <div className="fileCard">
                        {this.props.fileList.map(item => {
                            return (
                                <FileCard
                                    key={item.url}
                                    file={item}
                                    removeFile={this.props.removeFile}
                                    downloadFile={this.props.downloadFile}
                                />
                            );
                        })}
                    </div>
                ) : null}

                {this.props.loading && (
                    <CircularProgress style={{ position: "absolute", top: "30%", left: "45%" }} color="secondary" />
                )}
            </div>
        );
    }
}
export default UploadFile;

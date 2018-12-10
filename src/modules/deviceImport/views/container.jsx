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
 * Created by Krishalee on 16/11/18.
 */
import React from "react";
import Filelist from "./fileList";
import Header from "./header";
import { reducerName as topoimportReducerName } from "modules/deviceImport";
import { connect } from "react-redux";
import "../styles/style.less";

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    handleProgress = value => {
        this.setState({
            progress: value
        });
    };

    render() {
        return (
            <div className="import-container">
                <Header
                    identify={this.props.identify}
                    title={this.props.title}
                    subTitle={this.props.subTitle}
                    inProgress={this.state.progress}
                    postData={this.props.postData}
                    searchPredicate={this.props.searchPredicate}
                    pageLimit={this.props.pageLimit}
                    pageNo={this.props.pageNo}
                    datePredicate={this.props.datePredicate}
                />
                <Filelist
                    pageLimit={this.props.pageLimit}
                    pageNo={this.props.pageNo}
                    pageSize={this.props.pageSize}
                    postData={this.props.postData}
                    datePredicate={this.props.datePredicate}
                    searchPredicate={this.props.searchPredicate}
                    handleProgress={this.handleProgress}
                />
            </div>
        );
    }
}

const filterProps = (state, identify, reducerName, props) => {
    if (state[reducerName] && state[reducerName][identify]) {
        return state[reducerName][identify][props];
    }
};

const mapStateToProps = (state, ownProps) => {
    let identify = ownProps.identify || "deviceImport";
    return {
        title: filterProps(state, identify, topoimportReducerName, "title") || ownProps.title,
        subTitle: filterProps(state, identify, topoimportReducerName, "subTitle") || ownProps.subTitle,
        pageLimit: filterProps(state, identify, topoimportReducerName, "pageLimit") || ownProps.pageLimit,
        pageNo: filterProps(state, identify, topoimportReducerName, "pageNo") || ownProps.pageNo,
        pageSize: filterProps(state, identify, topoimportReducerName, "pageSize") || ownProps.pageSize,
        postData: filterProps(state, identify, topoimportReducerName, "postData") || ownProps.postData,
        datePredicate: filterProps(state, identify, topoimportReducerName, "datePredicate") || ownProps.datePredicate,
        searchPredicate:
            filterProps(state, identify, topoimportReducerName, "searchPredicate") || ownProps.searchPredicate
    };
};

export default connect(
    mapStateToProps,
    null
)(Container);

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
 * Created by xulu on 25/05/2018.
 */
import React from "react";
import "../styles/style.less";
import { connect } from "react-redux";
// import { REDUCER_NAME as topoFloatTabReducer } from "../funcs/constants";
import { detailSearch } from "../funcs/actions";
import { TextField } from "modules/common";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

class detailFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        };
    }
    componentWillReceiveProps(nextProps) {}

    componentDidMount() {
        // this.searchDeviceDetail(this.props);
    }
    handleSearchClick(event) {
        let searchWord = this.state.searchText;
        this.props.detailSearch(this.props.identify, searchWord);
    }

    handleInputChanged(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    handleInputKeyUp(event) {
        if (event.keyCode === 13) {
            this.handleSearchClick(event);
        }
    }

    render() {
        return (
            <TextField
                className="default-input-search"
                placeholder="Search"
                value={this.state.searchText}
                onChange={this.handleInputChanged.bind(this)}
                onKeyUp={this.handleInputKeyUp.bind(this)}
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon onClick={this.handleSearchClick.bind(this)} color="action" />
                        </InputAdornment>
                    )
                }}
            />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        detailSearch: (identify, searchWord) => {
            dispatch(detailSearch(identify, searchWord));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(detailFilter);

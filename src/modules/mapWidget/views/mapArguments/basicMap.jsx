/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidentifyential and proprietary to NCS Pte. Ltd. You shall
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
 * Created by Deng Xiaolong on 28/05/2018.
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import SetTitle from "../commonComponents/setTitle";
import { mapChangeEditerStatus } from "./../../funcs/actions";

class BasicMapArgs extends Component {
    componentWillMount() {
        const { dispatch, identify } = this.props;
        dispatch(mapChangeEditerStatus("editing", identify));
    };
    render() {
        const { identify, title } = this.props;
        const data = this.props[`map${identify}`];
        const mapTitle = (data && data.title) || title; 
        return (
            <React.Fragment>
                <SetTitle panelTitle={mapTitle} identify={identify} />
            </React.Fragment>
        );
    }
}

export default connect()(BasicMapArgs);

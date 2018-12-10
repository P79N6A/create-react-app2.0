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
 * Created by KaiDi on 25/05/2018.
 */
import React, { Component } from "react";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";
import { Format, SelectXdata, SelectYdata, ServiceList } from "modules/charts/views/views-edit/editComps";

class QueryKpi extends Component {
    static propTypes = {};
    siteName = sessionStorage.getItem(ISC_ACCOUNT_INFO) && JSON.parse(sessionStorage.getItem(ISC_ACCOUNT_INFO)).displayname;
    componentWillMount() {
        let { onGetServiceList, identify } = this.props;
        onGetServiceList && onGetServiceList(identify, this.siteName);
    }
    render() {
        return (
            <div>
                <ServiceList {...this.props} />
                <SelectXdata {...this.props} />
                <SelectYdata {...this.props} />
                <Format {...this.props} />
            </div>
        );
    }
}

export default QueryKpi;
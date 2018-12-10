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
 * Created by LWP on 25/05/2018.
 */
import React, { Component } from "react";
// import PropTypes from "prop-types";
import page from "commons/utils/page";
import _ from "lodash";
import { view as Container } from "modules/container";
// import matcher from "commons/utils/matcher";

export default configImport => {
    return class extends Component {
        state = {
            C: null
        };
        componentDidMount = async () => {
            let config = await configImport();
            // config = matcher.match(matcher.flattn(config), config);
            const { layout } = config;
            const Comps = await page.run(config);

            this.setState({ Comps, layout });
        };
        render = () => {
            const { Comps, layout } = this.state;
            return (
                <React.Fragment>
                    <Container {...layout} modules={Comps} />
                </React.Fragment>
            );
        };
    };
};

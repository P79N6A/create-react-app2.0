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
 * Created by Wangrui on 04/06/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import { Select } from "modules/common";
import _ from "lodash";
import { ISC_ACCOUNT_INFO } from "commons/constants/const";

export default class LoginGroup extends React.Component {
    handleGroupChange(e) {
        this.props.handleGroupChange(e.target.value);
    }

    render() {
        const { account, group } = this.props;
        let currentGroup = {};
        for (let i = 0; i < account.length; i++) {
            if (account[i].id === group) {
                currentGroup = { displayname: account[i].displayname, id: group };
                break;
            }
        }
        const groupConfig = _.isEmpty(currentGroup)
            ? sessionStorage.getItem(ISC_ACCOUNT_INFO)
            : JSON.stringify(currentGroup);
        sessionStorage.setItem("ISC-GROUP", groupConfig);
        return (
            <div>
                <Select
                    value={group}
                    onChange={this.handleGroupChange.bind(this)}
                    inputProps={{
                        name: "group",
                        id: "group-simple"
                    }}
                    style={{ width: "100%" }}
                >
                    {account &&
                        account.map((item, i) => (
                            <MenuItem value={item.id} key={i}>
                                {item.displayname}
                            </MenuItem>
                        ))}
                </Select>
            </div>
        );
    }
}
LoginGroup.defaultProps = {
    account: [],
    group: "Default"
};
LoginGroup.propTypes = {
    account: PropTypes.array.isRequired,
    group: PropTypes.string.isRequired
};

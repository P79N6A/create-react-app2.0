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
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { TabView } from "../../common/index";
import Applications from "./Applications";
import SelectedApplications from "./SelectedApplication";
// import Visualizations from "./Visualizations";
import Users from "./Users";
import { connect } from "react-redux";
import { I18n } from "react-i18nify";
import { REDUCER_NAME } from "../funcs/constants";
// import * as actions from "../funcs/actions";
/**
 * Tab view component
 * @example
 * @returns Component
 */
class Tab extends React.Component {
    state = { currGroupData: {}, editMode: "" };
    getTabs = () => {
        const { editMode } = this.state;
        if (!editMode) return [];
        return [
            {
                visible: !!(editMode !== "view"),
                label: I18n.t("security.userGroups.Applicatinos"),
                view: () => {
                    return <Applications editMode={editMode} />;
                }
            },
            {
                // visible: !!(editMode !== "add"),
                label: I18n.t("security.userGroups.SelectedApplications"),
                view: () => {
                    return <SelectedApplications editMode={editMode} />;
                }
            }
        ];
    };
    getUserTab = () => {
        const { currGroupData, editMode } = this.state;
        const { users, grpid } = currGroupData;
        if (!editMode) return [];
        return [
            {
                label: I18n.t("security.userGroups.User"),
                view: () => {
                    return <Users editMode={editMode} users={users} grpid={grpid} />;
                }
            }
        ];
    };
    componentDidMount() {
        const { editMode } = this.props;
        this.setState({
            editMode
        });
    }
    componentWillReceiveProps(nextProps) {
        const { currGroupData, editMode } = nextProps;
        this.setState({
            currGroupData,
            editMode
        });
    }
    render() {
        const { editMode } = this.state;
        return (
            <React.Fragment>
                {editMode !== "add" && (
                    <div style={{ margin: "16px 0px " }}>
                        <TabView tabs={this.getUserTab()} />
                    </div>
                )}

                <TabView tabs={this.getTabs()} />
            </React.Fragment>
        );
    }
}
Tab.propTypes = {
    classes: PropTypes.object
};
Tab.defaultProps = {};
const mapStateToProps = state => {
    return {
        currGroupData: state[REDUCER_NAME] && state[REDUCER_NAME].currGroupData
    };
};
export default connect(
    mapStateToProps,
    null
)(Tab);

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
 * Created by wplei on 23/07/18.
 */

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "../../../components/views/dialog";
import Wrap from "commons/components/wrapComponent";
// import { theme as themes } from "modules/theme";
import { MenuItem, FormHelperText, ListItemText } from "@material-ui/core";
import { InputLabel, TextField, Select, Chip } from "modules/common";
// import store from "commons/store";
// import { getResourceInfo } from "../../funcs/actions";

const styles = themes => {
    return {
        select_root: {
            whiteSpace: "pre-wrap"
        },
        form_single: {
            "&:first-child": {
                marginTop: "0px !important"
            },
            marginTop: themes.spacing.unit * 3
        }
    };
};

class SecurityModal extends React.Component {
    state = {
        // selectedId: null,
        // resourceDesc: "",
        // resourceTable: "PAGE",
        selectedPermissions: []
        // delPermissions: new Set(),
        // resourceValue: "R-DASHBOARD"
    };
    static defaultProps = {
        subTitle: "",
        submitText: "",
        materialKey: "",
        permissions: [],
        title: "Application Associate"
    };
    dialog_cancel = () => {
        this.setState({
            // selectedId: null,
            // resourceDesc: "",
            selectedPermissions: [this.currentAppId]
        });
        this.props.onCancel("addPermission");
    };
    dialog_submit = () => {
        const { selectedPermissions } = this.state;
        this.currentAppId = selectedPermissions[0];
        const { selectedTopId } = this.state;
        this.props.onSubmit(selectedTopId);
    };
    handlePermissionChange = (id, name) => {
        let topName = name;
        let topId = id;
        let selectedPermissions = [topName];
        this.setState({
            selectedTopId: topId,
            selectedPermissions
        });
    };
    componentWillReceiveProps = nextProps => {
        let { resourceDetail, permissions, group } = nextProps,
            selectedPermission = null;
        if (group === "admin" && resourceDetail !== undefined && resourceDetail.applicationid) {
            permissions &&
                permissions.forEach(item => {
                    if (item["address.iotTopologyId"] === resourceDetail.applicationid) {
                        selectedPermission = item["address.displayName"];
                    }
                });
            this.currentAppId = selectedPermission;
            this.setState({
                selectedPermissions: [selectedPermission]
            });
        } else if (group !== "admin" && resourceDetail !== undefined && resourceDetail.applicationid) {
            permissions &&
                permissions.forEach(item => {
                    if (item.applicationid === resourceDetail.applicationid) {
                        selectedPermission = item.displayname;
                    }
                });
            this.currentAppId = selectedPermission;
            this.setState({
                selectedPermissions: [selectedPermission]
            });
        }
    };
    render = () => {
        const { selectedPermissions } = this.state;
        const { open, title, classes, subTitle, submitText, materialKey, permissions, group } = this.props;
        return (
            <Dialog
                open={open}
                title={title}
                subTitle={subTitle}
                submitText={submitText}
                isDisabled={selectedPermissions.length === 0}
                onCancle={this.dialog_cancel}
                onSubmit={this.dialog_submit}
            >
                {/* <MuiThemeProvider theme={themes}> */}
                {/* resource name */}
                <div className={classes.form_single}>
                    <InputLabel required>Resource name</InputLabel>
                    <TextField fullWidth disabled value={materialKey} />
                </div>
                {/* permissions */}
                <div className={classes.form_single}>
                    <InputLabel required>Application Associate</InputLabel>
                    <Select
                        fullWidth
                        name="selectedPermissions"
                        value={selectedPermissions}
                        classes={{
                            selectMenu: classes.select_root
                        }}
                        // onChange={this.handlePermissionChange}
                        renderValue={selected => (
                            <Wrap>
                                {selected.map(v => (
                                    <Chip key={v} label={v} />
                                ))}
                            </Wrap>
                        )}
                    >
                        {permissions.map((item, index) => {
                            return group === "admin" ? (
                                <MenuItem
                                    key={index}
                                    selected={selectedPermissions[0] === item["address.displayName"]}
                                    onClickCapture={() =>
                                        this.handlePermissionChange(
                                            item["address.iotTopologyId"],
                                            item["address.displayName"]
                                        )
                                    }
                                >
                                    <ListItemText>{item["address.displayName"]}</ListItemText>
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    key={index}
                                    selected={selectedPermissions[0] === item.displayname}
                                    onClickCapture={() =>
                                        this.handlePermissionChange(item.applicationid, item.displayname)
                                    }
                                >
                                    <ListItemText>{item.displayname}</ListItemText>
                                </MenuItem>
                            );
                        })}
                    </Select>
                    {selectedPermissions.length === 0 && (
                        <FormHelperText
                            error
                            classes={{
                                root: classes.formhelpertext_root
                            }}
                        >
                            Please select one application
                        </FormHelperText>
                    )}
                </div>
                {/* </MuiThemeProvider> */}
            </Dialog>
        );
    };
}

export default withStyles(styles)(SecurityModal);

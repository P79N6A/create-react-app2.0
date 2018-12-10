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
 * Created by wplei on 25/05/18.
 */
/*
 * @Author: wplei
 * @Date: 2018-11-12 15:24:20
 * @Last Modified by:   wplei
 * @Last Modified time: 2018-11-12 15:24:20
 */

import { Divider, FormControl } from "@material-ui/core";
import store from "commons/store";
import { TextField } from "modules/common";
import React from "react";
import * as actions from "../../funcs/actions";
import { filterFirstSpace } from "../../funcs/constants";

const defaultProps = {};
const propTypes = {};

class TemplateContent extends React.Component {
    state = {
        name: "",
        desc: "",
        validate: false
    };
    componentWillMount = () => {
        this.props.onRender(this);
    };
    submit = () => {
        const { pageConfig, app } = this.props;
        const appid = app["address.iotTopologyId"];
        const { name, desc } = this.state;
        if (name === "")
            return this.setState({
                validate: true
            });
        const postdata = {
            title: name,
            desc,
            pageConfig,
            applicationId: appid
        };
        store.dispatch(actions.lockDialog(true));
        store.dispatch(actions.saveUseTemplate(postdata));
    };
    close = () => {
        console.log("close");
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: filterFirstSpace(event.target.value)
        });
    };
    render = () => {
        const { name, desc, validate } = this.state;
        return (
            <React.Fragment>
                <FormControl fullWidth>
                    <TextField
                        required
                        label="Template Name"
                        error={validate && name === ""}
                        value={name}
                        name="name"
                        onChange={this.handleChange}
                    />
                    <Divider
                        style={{
                            height: 16,
                            background: "transparent"
                        }}
                    />
                    <TextField
                        multiline
                        rows={4}
                        name="desc"
                        rowsMax={6}
                        value={desc}
                        label="Description"
                        onChange={this.handleChange}
                    />
                </FormControl>
            </React.Fragment>
        );
    };
}

TemplateContent.defaultProps = defaultProps;
TemplateContent.propTypes = propTypes;

export default TemplateContent;

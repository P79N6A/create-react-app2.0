/*
 * =========================================================================
 *  Copyright (C)2015 NCS Pte. Ltd. All Rights Reserved
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
 * Created by @Luo Jia alex on 29/05/15.
 */
/**
 * @save the library template
 * @module SaveTemplate
 * @author LUOJIA
 * @exports {
 *  SaveTemplate
 * }
 */
import React from "react";
import Dialog from "../../../components/views/dialog";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "../../../../common/index";
import { connect } from "react-redux";
import { saveTemplate } from "../../funcs/actions";
import { REDUCER_NAME as reducerName } from "../../funcs/constants";

// import {} from "../funcs/actions";
// import { REDUCER_NAME as topoReducer } from "../funcs/constants";

const styles = theme => ({
    editItem: {
        width: "100%"
    }
});

class SaveTemplate extends React.Component {
    static defaultProps = {
        mode: "",
        open: false
    };

    state = {
        title: "Save as New Dashboard Template",
        subTitle: "Add this dashboard to 'User Submitted Templates'.",
        open: false,
        desc: "",
        name: "",
        pageConfig: {},
        nameRegx: /(^\s*)|(\s*$)/g
    };
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            pageConfig: nextProps.pageConfig
        });
    }

    cancel = () => {
        this.props.onCancel("saveAsTemp");
    };

    submit = () => {
        const { pageConfig, desc, name } = this.state;
        const { app } = this.props;
        const appid = (app && JSON.parse(app)["address.iotTopologyId"]) || null;
        if (!desc || !name) return;
        // let configValue = Object.assign({},pageConfig.configValue,{title: name});
        // const {pageId,pageKey,...otherConfig } = pageConfig;
        // let newPageConfig = Object.assign({},otherConfig,{desc,configValue});
        let templateData = {
            title: name.replace(this.state.nameRegx, ""),
            desc,
            pageConfig,
            applicationId: appid
        };
        this.props.saveTemplate(templateData);
        this.props.onSubmit("saveAsTemp");
    };

    render() {
        const { classes } = this.props;
        const { title, subTitle, open } = this.state;
        return (
            <Dialog title={title} onCancle={this.cancel} onSubmit={this.submit} open={open} subTitle={subTitle}>
                <div className={classes.root}>
                    <TextField
                        label="New Template Name"
                        name="name"
                        margin="dense"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className={classes.editItem}
                    />
                    <TextField
                        label="Description"
                        name="desc"
                        margin="dense"
                        multiline
                        rows={4}
                        rowsMax={6}
                        value={this.state.desc}
                        onChange={this.handleChange}
                        className={classes.editItem}
                    />
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    return {
        actions: state[reducerName] && state[reducerName].buttonActions,
        pageConfig: state[reducerName] && state[reducerName].pageConfig
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveTemplate: templateData => {
            dispatch(saveTemplate(templateData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SaveTemplate));

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
 * Created by wangrui on 22/06/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ApiMapping from "./apiMapping";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
class ActionApi extends React.Component {
    static propTypes = {
        classes: PropTypes.object
    };

    state = {
        config: {}
    };

    componentWillMount() {
        this.getConfigData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.getConfigData(nextProps);
    }
    getConfigData(nextProps) {
        const { apiConfig, actionConfigs, apiSchema } = nextProps;
        let configs = {};
        if (actionConfigs) {
            this.setState({ config: actionConfigs });
        } else {
            if (apiConfig && Object.keys(apiConfig).length > 0) {
                const apiconfig =
                    apiConfig && apiConfig.configvals && apiConfig.configvals[0] && apiConfig.configvals[0].configval;
                if (apiconfig) {
                    const apiconfigs = JSON.parse(apiconfig) && JSON.parse(apiconfig).apis;
                    apiconfigs &&
                        apiconfigs.forEach((item, num) => {
                            configs[num] = configs[num] ? configs[num] : {};
                            for (let i in apiSchema) {
                                if(item[i] instanceof Object){
                                    const values = item[i];
                                    const config = {};
                                    let number = 0;
                                    for (let key in values) {
                                        let n = number++;
                                        config[n] = { key: key, value: values[key] };
                                    }
                                    configs[num][i] = config;
                                }else{
                                    configs[num][i] = item[i];
                                }
                            }
                        });
                } else {
                    for (let i in apiSchema) {
                        configs[0] = configs[0] ? configs[0] : {};
                        configs[0][i] = apiSchema[i].default;
                    }
                }
                this.setState({ config: configs });
            }
        }
    }
    handleDeleteClick(num) {
        let { config } = this.state;
        delete  config[num];
        let action = {
            "apis":config
        };
        this.setState({config});
        this.props.handleDeleteClick(action);
    }
    generateActionSchema() {
        const { apiSchema } = this.props;
        const { config } = this.state;
        let result = [];
        const cunum = Object.keys(config).length;
        for (let num = 0; num < cunum; num++) {
            for (let api in apiSchema) {
                result.push(
                    <ListItem key={api}>
                        <ApiMapping
                            key={api}
                            data={apiSchema[api]}
                            label={api}
                            getActionConfig={this.props.getActionConfig}
                            isSave={this.props.isSave}
                            actionConfig={config}
                            identify={this.props.identify}
                            apiSchema={apiSchema}
                            actionApiNum={num}
                        />
                    </ListItem>
                );
            }
            result.push(
                <ListItem key={num}>
                    <IconButton size="small" onClick={this.handleDeleteClick.bind(this, num)} style={{margin: "0 auto"}}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            );
        }
        return result;
    }

    render() {
        return this.generateActionSchema();
    }
}

export default ActionApi;

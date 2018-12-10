import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";
const styles = theme => ({
    root: {
        width: "100%",
        height: "calc(100% - 72px)"
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        height: "100%",
        overflowY: "auto"
    },
    textColor: {
        color: theme.typography.caption.color
    }
});

class ApiActionMappingComp extends React.Component {
    state = {
        config: {},
        api: "",
        addApi: false,
        apiFarmatFlag: false,
        apiList: {}
    };

    componentWillMount() {
        const { actionConfigs } = this.props;
        this.getConfig(actionConfigs);
    }
    componentWillReceiveProps(nextProps) {
        const { actionConfigs } = nextProps;
        if (!(_.isEqual(actionConfigs, this.props.actionConfigs))) {
            this.getConfig(actionConfigs);
        }
    }
    getConfig(actionConfigs) {
        if (!actionConfigs) {
            return;
        }
        this.setState({ config: actionConfigs });
    }
    getdatas(apiConfig, apiSchema) {
        let configs = {};
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
            }
        }
        return configs;
    }
    switch = (data, key) => {
        const { config } = this.state;
        if (Object.keys(config).length === 0) {
            return null;
        }
        return (
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <FormControlLabel
                    control={<Switch checked={config[key]} onChange={this.handleChange.bind(this, key)} value={key} />}
                    label={data.displayname}
                />
                {config[key] && <IconButton size="small" onClick={this.handleAddClick.bind(this)}>
                    <AddIcon />
                </IconButton>
                }
            </div>
        );
    };

    handleAddClick() {
        const { apiConfig, apiSchema } = this.props;
        let { config } = this.state;
        let api = {};
        for (let i in apiSchema) {
            api[i] = apiSchema[i].default;
        }
        let length = 0;
        if(!config.apis){
            const configs = this.getdatas(apiConfig, apiSchema);
            config.apis = configs;
        }
        if (Object.keys(config.apis).length !== 0) {
            length = parseInt(Object.keys(config.apis)[Object.keys(config.apis).length - 1], 10) + 1;
        }
        let action = {
            api: {
                apis: Object.assign({},config.apis, {[length]: api})
            }
        };
        
        this.props.getActionConfig(action);
    }

    handleChange(name, event) {
        const { config } = this.state;
        config[name] = event.target.checked;
        this.setState({
            config: config
        });
        let action = {};
        action["api"] = config;
        this.props.getActionConfig(action);
    }

    render() {
        const { data, label } = this.props;
        if (!data) {
            return null;
        }
        return this.switch(data, label);
    }
}
ApiActionMappingComp.propTypes = {
    actionConfigs: PropTypes.object
};

ApiActionMappingComp.defaultProps = {
    actionConfigs: {}
};

export default withStyles(styles)(ApiActionMappingComp);

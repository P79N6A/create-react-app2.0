import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Select } from "modules/common";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField } from "modules/common";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import _ from "lodash";
import store from "commons/store";
import { REDUCER_NAME as ccmsExReducer } from "modules/ccmsEx";
import {actions as MODALS} from "modules/ccmsModal";
import connect from "react-redux/lib/connect/connect";
import DrawImage from "./drawImage";
import FormLabel from "@material-ui/core/FormLabel";
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

class dashboardMappingComp extends React.Component {
    state = {
        config: {},
        dashboard: "",
        adddashboard: false,
        dashboardList: []
    };

    componentWillMount() {
        const { dashboardConfig } = this.props;
        
        this.getConfig(dashboardConfig);
    }
    componentWillReceiveProps(nextProps) {
        const { dashboardConfig } = nextProps;
        if (
            !_.isEqual(dashboardConfig, this.props.dashboardConfig)
        ) {
            this.getConfig(dashboardConfig);
        }
    }
    getConfig(dashboardConfig, dashboardList) {
        if (!dashboardConfig) {
            return;
        }
        if (
            (dashboardList && Object.keys(dashboardList).length > 0)
        ) {
            let { config } = this.state;
            config["dashboardaction"] = dashboardConfig["dashboardaction"];
            this.setState({
                config
            });
            this.setState({ dashboardList });
        } else {
            this.setState({
                config: dashboardConfig
            });
        }
    }
    
    input = (data, key) => {
        let { config, regexValidate } = this.state;
        const { classes } = this.props;
        const operations = data.operations && data.operations.toLowerCase().includes("rw") ? false : true;
        return (
            <FormControl error={regexValidate[key] || false} style={{ width: "100%" }}>
                <Tooltip title={config[key] || ""} placement="bottom">
                    <TextField
                        color={classes.textColor}
                        label={data.displayname}
                        fullWidth
                        required={data.mandatory}
                        placeholder={data.default}
                        InputLabelProps={{
                            shrink: true
                        }}
                        error={regexValidate[key]||false}
                        helperText={regexValidate[key] ? data.valueerror : ""}
                        disabled={operations}
                        value={config[key]||""}
                        onChange={this.handleChange(key)}
                    />
                </Tooltip>
            </FormControl>
        );
    };
    switch = (data, key) => {
        const { config } = this.state;
        if (Object.keys(config).length === 0) {
            return null;
        }
        return (
            <FormControlLabel
                control={<Switch checked={config[key]} onChange={this.handleChange(key)} value={key} />}
                label={data.displayname}
            />
        );
    };
    
    singleSelect = (data, key) => {
        const {classes, dashboardList} = this.props;
        let file = {};
        const { config } = this.state;
        dashboardList.forEach(item =>{
            if(item.pageKey === config[key]){
                file = {name:item.name,thumbnail:item.thumbnail,pageKey: item.pageKey};
                return;
            }
        });
        return (
            <div style={{width: "100%"}}>
                <FormControl className={classes.formControl} style={{width: "100%"}}>
                    <FormLabel htmlFor={key} color="secondary">{data.displayname || ""}</FormLabel>
                    <Select
                        color={classes.textColor}
                        fullWidth
                        value={config[key]||""}
                        onChange={this.handleChange(key)}
                        inputProps={{
                            name: key,
                            id: key
                        }}
                    >
                        <MenuItem value="new">
                            <em>Create a new Dashboard</em>
                        </MenuItem>
                        {dashboardList && dashboardList.map((item) =>{
                            return <MenuItem key={item.pageKey} value={item.pageKey}>{item.name}</MenuItem>;
                        })}
                    </Select>
                </FormControl>
                {config[key] && config[key]!=="new" && <DrawImage file={file.thumbnail} des={file.desc}/>}
            </div>);
    };
    handleChange = (name) => event => {
        const { config } = this.state;
        if (name.includes("dashboardaction")) {
            config[name] = event.target.checked;
        } else {
            if(event.target.value==="new"){
                store.dispatch(MODALS.toggleModal(true, {mode: "add"}));
            }
            config[name] = event.target.value;
        }
        this.setState({
            config
        });
        const action = config;
        this.props.saveDashboardConfig(action, this.props.dashboardList);
    };
    render() {
        const { data, label } = this.props;
        if (!data) {
            return null;
        }
        const type = data.comp;
        switch (type) {
            case "switch":
                return this.switch(data, label);
            case "singleselect":
                return this.singleSelect(data, label);
            default:
                return this.input(data, label);
        }
    }
}
dashboardMappingComp.propTypes = {
    dashboardList: PropTypes.array
};

dashboardMappingComp.defaultProps = {
    dashboardList: []
};
const filterProps = (state, props) => {
    if (state[ccmsExReducer]) {
        return state[ccmsExReducer]["customizedDashboards"];
    }
};
const mapStateToProps = (state) => {
    return {
        dashboardList: filterProps(state, "customizedDashboards") || []
    };
};

export default withStyles(styles)(connect(
    mapStateToProps,
    null
)(dashboardMappingComp));

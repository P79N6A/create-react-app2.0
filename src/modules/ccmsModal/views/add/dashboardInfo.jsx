import { Divider, FormControl, FormGroup } from "@material-ui/core";
import { TextField } from "modules/common";
import PropTypes from "prop-types";
import React from "react";
import { filterFirstSpace } from "../../funcs/constants";
import { GroupSelecter } from "../move/statics";
import { PriorityCheckbox, PrivacySwitcher } from "./statics";

const defaultProps = {
    groups: [],
    validateKey: false,
    config: {
        // assignGroup: null,
        // "privacy&Priority": [true, true]
    }
};
const propTypes = {
    groups: PropTypes.array,
    validateKey: PropTypes.bool
};

class DashboardInfo extends React.Component {
    state = {
        name: "",
        desc: "",
        group: [],
        status: "2002",
        priority: "default"
    };
    handleChange = (event, options) => {
        this.props.onChange(event, options);
        switch (event.target.name) {
            case "status":
                this.setState({
                    [event.target.name]: this.state.status === "2001" ? "2002" : "2001"
                });
                break;
            case "priority":
                this.setState({
                    [event.target.name]: this.state.status === "high" ? "default" : "high"
                });
                break;
            default:
                this.setState({
                    [event.target.name]: filterFirstSpace(event.target.value)
                });
                break;
        }
    };
    render = () => {
        const { name, desc, group, status, priority } = this.state;
        const { groups, config, validateKey } = this.props;
        const { assignGroup } = config;
        const pp = config["privacy&Priority"];
        return (
            <React.Fragment>
                <FormControl fullWidth>
                    <TextField
                        error={name === "" && validateKey}
                        required
                        label="Dashboard Name"
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
                        maxrow={6}
                        label="Description"
                        name="desc"
                        value={desc}
                        onChange={this.handleChange}
                    />
                    <Divider
                        style={{
                            height: 16,
                            background: "transparent"
                        }}
                    />
                    <GroupSelecter
                        active={!assignGroup}
                        groups={groups}
                        selectedGroup={assignGroup || group}
                        onChange={this.handleChange}
                    />
                    <Divider
                        style={{
                            height: 16,
                            background: "transparent"
                        }}
                    />
                    <FormGroup row>
                        <PrivacySwitcher status={status} onChange={this.handleChange} />
                        <PriorityCheckbox priority={priority} onChange={this.handleChange} />
                    </FormGroup>
                </FormControl>
            </React.Fragment>
        );
    };
}

DashboardInfo.defaultProps = defaultProps;
DashboardInfo.propTypes = propTypes;

export default DashboardInfo;

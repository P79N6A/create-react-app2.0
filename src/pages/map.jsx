import React, { Component } from "react";
import { Switch, FormControlLabel } from "@material-ui/core";
import { SingleSelect } from "modules/mapAndPanelCommon";

export default class AutoCallApiSet extends Component {
    state = {
        checked: false,
        durationTime: ""
    };
    handleChange = () => {
        this.setState((prevState) => {
            const checked = prevState.checked;
            return {
                checked: !checked
            };
        });
    };

    durationTimeSelect = (durationTime) => {
        this.setState({
            durationTime
        });
    };

    render() {
        const { checked, durationTime } = this.state;
        return (
            <React.Fragment>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={this.handleChange}
                            value="checkedB"
                            color="primary"
                        />
                    }
                    label="AutoRefresh Duration"
                />
                {
                    checked && (
                        <SingleSelect
                            title="AutoRefresh Duration Time"
                            defaultValue={durationTime}
                            selctOptions={["30 seconds", "60 seconds", "90 seconds"]}
                            onSelect={this.durationTimeSelect}
                        />
                    )
                }
            </React.Fragment>
        );
    }
}

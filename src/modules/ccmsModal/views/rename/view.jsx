import { Divider, FormControl, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import { actions as CCMSEX } from "modules/ccmsEx";
import { TextField } from "modules/common";
import React from "react";
import * as actions from "../../funcs/actions";
import { filterFirstSpace } from "../../funcs/constants";

const styles = Theme => {
    return {
        typographyRoot: {
            flex: 1,
            fontSize: "1rem"
        }
    };
};

class RenameContent extends React.Component {
    state = {
        title: "",
        desc: ""
    };
    componentWillMount = () => {
        this.props.onRender(this);
        const { pageConfig } = this.props;
        const { desc, configValue } = pageConfig;
        const { title } = configValue;
        this.setState({
            title,
            desc
        });
    };
    submit = () => {
        let { app } = this.props;
        let appid = app && app["address.iotTopologyId"];
        const { desc, title } = this.state;
        const { pageConfig } = this.props;
        const { configValue } = pageConfig;
        const newPageConfig = Object.assign({}, pageConfig, {
            desc,
            appid,
            configValue: {
                ...configValue,
                title
            }
        });
        store.dispatch(actions.lockDialog(true));
        store.dispatch(CCMSEX.requestPageUpdate(newPageConfig));
        // store.dispatch(
        //     actions.toggleModal(false, {
        //         mode: null
        //     })
        // );
    };
    close = () => {
        console.log("close");
    };
    handleChange = event => {
        this.setState({
            validate: false,
            [event.target.name]: filterFirstSpace(event.target.value)
        });
    };
    render = () => {
        const { title, desc, validate } = this.state;
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography
                    classes={{
                        root: classes.typographyRoot
                    }}
                >
                    <FormControl fullWidth>
                        <TextField
                            required
                            label="Dashboard Name"
                            name="title"
                            value={title}
                            error={validate && title === ""}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <Divider
                        style={{
                            height: 16,
                            background: "transparent"
                        }}
                    />
                    <FormControl fullWidth>
                        <TextField
                            required
                            multiline
                            rows={2}
                            label="Description"
                            value={desc}
                            name="desc"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                </Typography>
            </React.Fragment>
        );
    };
}

export default withStyles(styles)(RenameContent);

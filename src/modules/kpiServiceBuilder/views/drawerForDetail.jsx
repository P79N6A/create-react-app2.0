import React, { Component } from "react";
// import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {Drawer} from "modules/common";
import { withStyles } from "@material-ui/core/styles";
import ServiceDetail from "./serviceDetail";

import "../styles/style.less";

const styles = theme => ({
    drawerPaper: {
        position: "absolute",
        width: 400,
        height: "100%"
    },
    root: {
        overflow: "auto"
    }
});

class ServiceDetailDrawer extends Component {
    static defaultProps = {
        data: []
    };
    state = {
        page: 0,
        rowsPerPage: 10
    };
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    render() {
        let { onPropertyChange, identify, showDetail, classes } = this.props;
        return (
            <Drawer
                variant="persistent"
                anchor="right"
                open={showDetail ? true : false}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Card classes={{ root: classes.root }}>
                    <CardHeader
                        action={
                            <IconButton>
                                <Icon onClick={() => onPropertyChange(identify, "showDetail", false)}>
                                    keyboard_arrow_left
                                </Icon>
                            </IconButton>
                        }
                        title="KPI Details"
                    />

                    <Paper className="kpiQuery-drawer" elevation={5}>
                        <ServiceDetail {...this.props} />
                        {/* <AddTable {...this.props} /> */}
                    </Paper>
                </Card>
            </Drawer>
        );
    }
}

export default withStyles(styles)(ServiceDetailDrawer);

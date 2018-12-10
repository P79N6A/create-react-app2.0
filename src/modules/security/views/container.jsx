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
 * Created by luo jia on 24/07/18.
 */
import React from "react";
import Wrap from "commons/components/wrapComponent";
// import { view as Header } from "modules/ccms/header/index";
import { withStyles } from "@material-ui/core/styles";
import { theme as themes } from "modules/theme";
// import { Switch } from "react-router-dom";
import { Paper, AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { UserView, GroupView, groupReducerName, ResourceView } from "modules/security";
import { I18n } from "react-i18nify";
const styles = theme => {
    return {
        root: {
            height: "100%"
        },
        paperRoot: {
            height: "100%",
            // padding: themes.spacing.unit * 1.5,
            overflow: "hidden",
            background: themes.palette.background.paper
            // background: themes.palette.primary.main
        },
        tabRoot: {
            // padding: theme.spacing.unit * 1.5 + "px 0px!important",
            padding: "0px 0px 0px!important",
            // padding: theme.spacing.unit * 1.5 + "px!important",
            height: "100%"
            // overflow: "hidden"
        },
        view: {
            height: "calc(100% - 48px)",
            overflow: "hidden",
            "&>div": {
                height: "100%"
            }
        },
        appBarroot: {
            "& button": {
                flexGrow: 0,
                minWidth: "100px"
            }
        }
    };
};

function TabContainer({ children, dir, classes }) {
    return (
        <Typography classes={{ root: classes.tabRoot }} component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}
class Security extends React.Component {
    state = {
        value: 0,
        radioSelected: "",
        selectedGroup: true
    };
    componentWillReceiveProps(nextProps) {
        const { radioSelected, currGroupData } = nextProps;
        this.setState({
            radioSelected: !radioSelected,
            selectedGroup: !currGroupData.grpid
        });
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    componentWillUnmount() {}
    render() {
        const { classes, theme } = this.props;
        const { value } = this.state;
        const Inset = () => {
            return (
                <AppBar position="static" color="inherit">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        className={classes.appBarroot}
                        fullWidth
                    >
                        <Tab label={I18n.t("security.users.Users")} disabled={false} />
                        <Tab label={I18n.t("security.userGroups.UserGroups")} disabled={false} />
                    </Tabs>
                </AppBar>
            );
        };
        return (
            <Wrap>
                <Paper className={classes.paperRoot} elevation={1}>
                    {value === 0 ? (
                        <TabContainer classes={classes} dir={theme.direction}>
                            <UserView inset={Inset()} />
                        </TabContainer>
                    ) : null}
                    {value === 1 ? (
                        <TabContainer classes={classes} dir={theme.direction}>
                            <GroupView inset={Inset()} />
                        </TabContainer>
                    ) : null}
                    {/* <SwipeableViews
                        className={classes.view}
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer classes={classes} dir={theme.direction}>
                            <User inset={Inset()} />
                        </TabContainer>
                        <TabContainer classes={classes} dir={theme.direction}>
                            <GroupView inset={Inset()} />
                        </TabContainer>
                    </SwipeableViews> */}
                    {/* <RoleView /> */}
                    <ResourceView />
                    {/* <Switch>
                            <PrivateRoute exact={true} strict={true} path="/security" component={User} />
                            <PrivateRoute exact={true} strict={true} path="/security/user" component={User} />
                            <PrivateRoute exact={true} strict={true} path="/security/group" component={groupView} />
                        </Switch> */}
                </Paper>
            </Wrap>
        );
    }
}

const mapStateToProps = state => {
    return {
        currGroupData: state[groupReducerName] && state[groupReducerName].currGroupData
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles, { withTheme: true })(Security));

// const security = ({ location, isValid, classes }) => {
//     document.title = "ISC-GUI Security Control";
//     return (
//         <Wrap>
//             <SecurityView />
//         </Wrap>
//     );
// };

// export default security;

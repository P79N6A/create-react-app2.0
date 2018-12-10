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
 * Created by Luo Jia on 25/05/2018.
 * Modified by Luo Jia on 25/05/2018.
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import theme from "modules/theme/theme.json";
import { Paper } from "@material-ui/core";
import classnames from "classnames";
const styles = theme => ({
    root: {
        flexGrow: 1
    },
    item: {
        height: 76
    },
    box: {
        width: 0,
        height: 0,
        borderWidth: 30,
        borderStyle: "solid"
    },
    paper: {
        padding: theme.spacing.unit * 0.5,
        margin: theme.spacing.unit * 1.5,
        boxSizing: "border-box",
        borderRadius: 5
    },
    detail: {
        // justifyContent: "space-around",
        flexWrap: "wrap"
    },
    highlight: {
        border: `1px solid ${theme.palette.secondary.main}`
    },
    listStyle: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
    }
});

const ColorItem = ({ classes, onClick, item, highlight = "" }) => {
    const { secondary, primary } = item;
    return (
        <div className={classnames(classes.paper, highlight)} onClick={onClick}>
            <div
                className={classes.box}
                style={{
                    borderColor: `${secondary} ${primary} ${primary} ${secondary}`
                }}
            />
        </div>
    );
};

const getThemeJson = theme => {
    let cache = [];
    for (let key in theme) {
        cache.push({
            primary: theme[key].DARK_THEME.palette.primary.main,
            secondary: theme[key].DARK_THEME.palette.secondary.main,
            theme: key
        });
    }
    return cache;
};

const themes = getThemeJson(theme);

class ThemeSelect extends React.PureComponent {
    state = {
        highlight: 0,
        item: themes[0]
    };
    componentWillMount() {
        const { schema, _updatevalue } = this.props;
        const { name } = schema;
        _updatevalue(themes[0].theme, name);
    }
    componentWillReceiveProps(nextProps) {
        const { theme } = nextProps;
        if (theme && theme !== this.props.theme) {
            let highlight = 0;
            let item = null;
            themes.forEach((themeItem, i) => {
                if (themeItem.theme === theme) {
                    highlight = i;
                    item = themeItem;
                }
            });
            this.setState({
                highlight,
                item
            });
        }
    }
    clickItem = (item, i) => e => {
        const { schema, _updatevalue } = this.props;
        const { name } = schema;
        this.setState(
            {
                highlight: i,
                item
            },
            () => {
                _updatevalue(item.theme, name);
            }
        );
    };
    render() {
        const { classes } = this.props;
        const { highlight, item } = this.state;
        // const { primary = "#171717", secondary = "#788ac3" } = item;
        return (
            <div className={classes.listStyle}>
                <Typography>{this.props.schema.displayname}</Typography>
                <Paper style={{ display: "flex" }}>
                    {getThemeJson(theme).map((item, i) => (
                        <ColorItem
                            key={i}
                            classes={classes}
                            item={item}
                            onClick={this.clickItem(item, i)}
                            highlight={highlight === i ? classes.highlight : ""}
                        />
                    ))}
                </Paper>
                {/* <Typography>{this.props.schema.displayname}</Typography>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div
                            className={classes.box}
                            style={{
                                borderWidth: 12,
                                paddingRight: 0,
                                borderColor: `${primary} ${secondary} ${secondary} ${primary}`
                            }}
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails classes={{ root: classes.detail }}>
                        {getThemeJson(theme).map((item, i) => (
                            <ColorItem
                                key={i}
                                classes={classes}
                                item={item}
                                onClick={this.clickItem(item, i)}
                                highlight={highlight === i ? classes.highlight : ""}
                            />
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel> */}
            </div>
        );
    }
}
ThemeSelect.defaultProps = {};
ThemeSelect.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(ThemeSelect);

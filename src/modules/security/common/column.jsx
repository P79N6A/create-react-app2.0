import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconButton, Menu, MenuItem, Checkbox, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { I18n } from "react-i18nify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
const styles = theme => ({
    highlight: {
        "&>span": {
            color: theme.palette.secondary.main
        }
    },
    normallight: {
        "&>span": {
            color: theme.palette.text.primary
        }
    }
});
const ITEM_HEIGHT = 48;
class ClomunFilter extends Component {
    state = {
        anchorEl: null,
        checked: []
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    componentDidMount() {
        this.setState({
            checked: this.props.options
        });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    checkClick = option => e => {
        const { checked } = this.state;
        let index = checked.indexOf(option);
        if (index !== -1) {
            checked.splice(index, 1);
        } else {
            checked.push(option);
        }
        this.setState({
            option: checked
        });
        this.props.checkClick(checked);
    };
    clearAll = () => {
        this.setState({
            checked: []
        });
        this.props.checkClick([]);
    };
    selectAll = () => {
        const { options } = this.props;
        this.setState({
            checked: options
        });
        this.props.checkClick(options);
    };
    render() {
        const { options, classes } = this.props;
        const { anchorEl, checked } = this.state;
        const open = Boolean(anchorEl);
        return (
            <React.Fragment>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    // style={{ margin: "0 8px" }}
                >
                    {/* <Icon>{icon}</Icon> */}
                    <FontAwesomeIcon icon={faList} size="xs" />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200
                        }
                    }}
                >
                    <MenuItem key={"Clear/Select All"}>
                        <ListItemText
                            primary={I18n.t("common.SelectAll")}
                            classes={{
                                root: options.length === checked.length ? classes.highlight : classes.normallight
                            }}
                            onClick={this.selectAll}
                        />
                        <ListItemText
                            primary={I18n.t("common.ClearAll")}
                            classes={{
                                root: checked.length === 0 ? classes.highlight : classes.normallight
                            }}
                            onClick={this.clearAll}
                        />
                    </MenuItem>
                    {options.map(option => (
                        <MenuItem key={option} onClick={this.checkClick(option)}>
                            <Checkbox checked={checked.indexOf(option) > -1} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Menu>
            </React.Fragment>
        );
    }
}

ClomunFilter.propTypes = {
    items: PropTypes.array,
    icon: PropTypes.string.isRequired
};

export default withStyles(styles)(ClomunFilter);

import { Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { DialogActionButtons, DialogHeaderActions, TranstionComponent, Mask } from "./dialogExStatics";

const styles = Theme => {
    return {
        dialogRoot: {
            // width: 600
            zIndex: Theme.zIndex.modal
        },
        dialogPaper: {
            maxWidth: 700
        },
        dialogTitleRoot: {
            "& h6": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }
        },
        dialogTitleRootFullWidth: {
            padding: "8px 24px 8px",
            "& h6": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }
        },
        dialogFullScreen: {
            padding: 0
        },
        dialogContentRoot: {
            maxHeight: "63vh",
            overflow: "hidden",
            width: 700
        },
        dialogContentRootNoPadding: {
            maxHeight: "63vh",
            overflow: "hidden",
            padding: 0,
            width: 700
        }
    };
};

const propTypes = {
    open: PropTypes.bool,
    padding: PropTypes.bool,
    title: PropTypes.string,
    actions: PropTypes.array,
    disabled: PropTypes.bool,
    classes: PropTypes.object,
    children: PropTypes.element,
    actionState: PropTypes.number,
    headerActions: PropTypes.array
};

const defaultProps = {
    title: "",
    classes: {},
    actions: [],
    open: false,
    padding: true,
    actionState: 0,
    disabled: false,
    fullScreen: false,
    headerActions: [],
    children: <React.Fragment />
};

class DialogEx extends React.Component {
    state = {
        searchInput: "",
        actionState: 0,
        headerActionState: 0
    };
    handleClick = (action, event) => {
        const { onClick } = this.props;
        const { id } = action;
        switch (id) {
            case "nagetive":
                this.setState({
                    headerActionState: 0,
                    actionState: 0
                });
                break;
            case "search":
                this.setState({
                    searchInput: event.target.value
                });
                break;
            default:
                break;
        }
        onClick(action, event);
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        const { headerActionState, actionState } = nextProps;
        return {
            headerActionState,
            actionState
        };
    }
    render = () => {
        const { open, title, classes, actions, children, disabled, headerActions, padding, ...rest } = this.props;
        const { fullScreen } = rest;
        const { headerActionState, actionState, searchInput } = this.state;
        return (
            <Dialog
                {...rest}
                open={open}
                disablePortal
                classes={{
                    root: classes.dialogRoot,
                    paper: fullScreen ? "" : classes.dialogPaper
                }}
                TransitionComponent={TranstionComponent}
            >
                <DialogTitle
                    classes={{
                        root: fullScreen ? classes.dialogTitleRootFullWidth : classes.dialogTitleRoot
                    }}
                >
                    <div>
                        {title} {disabled && <CircularProgress color="secondary" size={24} />}
                    </div>
                    <DialogHeaderActions
                        actions={headerActions}
                        actionState={headerActionState}
                        onClick={this.handleClick}
                    />
                </DialogTitle>
                <DialogContent
                    classes={{
                        root: fullScreen
                            ? classes.dialogFullScreen
                            : padding
                                ? classes.dialogContentRoot
                                : classes.dialogContentRootNoPadding
                    }}
                >
                    {children}
                    <Mask open={disabled} />
                </DialogContent>
                {!fullScreen && (
                    <DialogActions>
                        <DialogActionButtons
                            actions={actions}
                            actionState={actionState}
                            onClick={this.handleClick}
                            searchInput={searchInput}
                        />
                    </DialogActions>
                )}
            </Dialog>
        );
    };
}

DialogEx.defaultProps = defaultProps;
DialogEx.propTypes = propTypes;

export default withStyles(styles)(DialogEx);

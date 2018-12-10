import store from "commons/store";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Dialog from "../components/dialogEx";
import * as actions from "../funcs/actions";
import { REDUCER_NAME } from "../funcs/constants";

const defaultProps = {
    open: false,
    actions: [],
    title: "",
    mode: null,
    headerActions: [],
    args: {
        title: ""
    }
};
const propTypes = {
    open: PropTypes.bool,
    actions: PropTypes.array,
    title: PropTypes.string,
    headerActions: PropTypes.array
};

class Container extends React.Component {
    state = {
        actionState: 0,
        headerActionState: 0
    };
    handleClick = buttonAction => {
        let { id, target } = buttonAction;
        switch (id) {
            case "nagetive":
                store.dispatch(
                    actions.toggleModal(false, {
                        mode: null,
                        args: {}
                    })
                );
                this.setState({
                    actionState: 0,
                    headerActionState: 0
                });
                break;
            case "positive":
                this.C.submit();
                break;
            case "switch":
                if (target === undefined) target = 0;
                this.setState(
                    {
                        headerActionState: target,
                        actionState: target
                    },
                    () => {
                        this.forceUpdate();
                    }
                );
                this.C.switchContent(target);
                break;
            case "checkAll":
                // from export
                this.C.toggleCheckAll();
                break;
            case "search":
                this.c.searchByInput();
                break;
            default:
                break;
        }
    };
    handleRender = content => {
        this.C = content;
    };
    // for children element use only, switch header action button state
    switchHeaderActionState = status => {
        this.setState(
            {
                headerActionState: status || 0
            },
            () => {
                this.forceUpdate();
            }
        );
    };
    // for children element use only, switch action button state
    switchActionState = status => {
        this.setState(
            {
                actionState: status || 0
            },
            () => {
                this.forceUpdate();
            }
        );
    };
    // disable/active padding for dialog

    componentDidMount = () => {
        const { currentApplicationInfo } = this.props;
        const applicationId = currentApplicationInfo["address.iotTopologyId"];
        store.dispatch(actions.getGroups(applicationId));
    };
    shouldComponentUpdate = (nextProps, nextState) => {
        if (_.isEqual(nextProps, this.props)) return false;
        return true;
    };
    render = () => {
        const { actionState, headerActionState } = this.state;
        const { open, mode, args, currentApplicationInfo, dialogDisabled } = this.props;
        const { title: priorityTitle } = args;
        const { title = "", actions = [], headerActions = [], props = {}, padding = true } = this.props[mode] || {};
        const C = mode ? require(`./${mode}/view.jsx`).default : React.Fragment;
        return (
            <Dialog
                padding
                open={open}
                actions={actions}
                actionState={actionState}
                disabled={dialogDisabled}
                onClick={this.handleClick}
                headerActions={headerActions}
                title={priorityTitle || title}
                headerActionState={headerActionState}
            >
                {mode && (
                    <C {...args} parent={this} {...props} app={currentApplicationInfo} onRender={this.handleRender} />
                )}
            </Dialog>
        );
    };
}

Container.defaultProps = defaultProps;
Container.propTypes = propTypes;

const mapStateToProps = (state, ownedProps) => {
    return {
        open: state && state[REDUCER_NAME] && state[REDUCER_NAME].open,
        mode: state && state[REDUCER_NAME] && state[REDUCER_NAME].mode,
        args: state && state[REDUCER_NAME] && state[REDUCER_NAME].args,
        dialogDisabled: state && state[REDUCER_NAME] && state[REDUCER_NAME].dialogDisabled
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container);

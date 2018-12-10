import { Step, Stepper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import store from "commons/store";
import { StepLabel } from "modules/common";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import * as actions from "../../funcs/actions";
import { REDUCER_NAME } from "../../funcs/constants";
import DashboardInfo from "./dashboardInfo";
import UserTemplate from "./userTemplate";
import { filterFirstSpace } from "../../funcs/constants";
import _ from "lodash";

const styles = Theme => {
    return {
        typographyRoot: {
            flex: 1,
            fontSize: "1rem"
        }
    };
};

const defaultProps = {
    classes: {},
    steps: []
    // groupInfoConfig: {
    //     assignGroup: [],
    //     "privacy&Priority": [false, false]
    // }
};

const propTypes = {
    classes: PropTypes.object,
    steps: PropTypes.array
};

class AddContent extends React.Component {
    state = {
        step: 0,
        name: "",
        desc: "",
        group: [],
        validate: false,
        status: "2002",
        selectedSeqId: "",
        priority: "default",
        selectedTemplate: {},
        templateCaterogy: "default"
    };
    componentDidMount = () => {
        this.props.onRender(this);
    };
    submit = () => {
        let { app, trigger } = this.props;
        let { step, name, desc, group, status, priority, selectedTemplate = {} } = this.state;
        let { value = {} } = selectedTemplate;
        let { pageConfig = {} } = value;
        let { configValue = {} } = pageConfig;
        let { widgets = [] } = configValue;
        // return if no template selected
        if (_.isEqual(selectedTemplate, {})) return;
        if (step === 0)
            return this.setState({ step: ++step }, () => {
                this.props.parent.switchActionState(1);
                this.props.parent.switchHeaderActionState(1);
            });
        // return if nameless, and do validate
        if (_.isEqual(name, "")) return this.setState({ validate: true });
        store.dispatch(actions.lockDialog(true));
        store.dispatch(
            actions.createPage(
                name,
                desc,
                group,
                priority,
                status,
                widgets,
                app && app["address.iotTopologyId"],
                trigger
            )
        );
    };
    close = () => {
        this.setState({
            selectedTemplate: {},
            selectedSeqId: ""
        });
    };
    switchContent = () => {
        this.setState(
            {
                step: this.state.step ? 0 : 1
            },
            () => {
                if (this.state.step === 0)
                    return this.setState({
                        name: "",
                        desc: "",
                        group: [],
                        validate: false,
                        status: "2002",
                        priority: "default",
                        selectedSeqId: "",
                        selectedTemplate: {}
                    });
            }
        );
    };

    stepContent = () => {
        const { step, templateCaterogy, selectedSeqId, validate } = this.state;
        const { templateCategories, groups } = this.props;
        switch (step) {
            case 0:
                return (
                    <UserTemplate
                        category={templateCaterogy}
                        selectedSeqId={selectedSeqId}
                        categories={templateCategories}
                        onSelect={this.handleMenuClick}
                        onChange={this.handleTemplateChange}
                    />
                );
            case 1:
                return (
                    <DashboardInfo
                        groups={groups}
                        validateKey={validate}
                        // config={groupInfoConfig}
                        onChange={this.handleDashboardInfoChange}
                    />
                );
            default:
                break;
        }
    };
    handleDashboardInfoChange = (event, options) => {
        switch (event.target.name) {
            case "status":
                this.setState({
                    [event.target.name]: this.state.status === "2001" ? "2002" : "2001"
                });
                break;
            case "priority":
                this.setState({
                    [event.target.name]: this.state.priority === "high" ? "default" : "high"
                });
                break;
            case "group":
                this.setState({
                    [event.target.name]: options
                });
                break;
            default:
                this.setState({
                    [event.target.name]: filterFirstSpace(event.target.value)
                });
                break;
        }
    };
    handleTemplateChange = template => {
        const { seqId } = template;
        this.setState({
            selectedTemplate: template,
            selectedSeqId: seqId
        });
    };
    handleMenuClick = category => {
        const { id } = category;
        if (id === this.state.templateCaterogy) return;
        store.dispatch(actions.getUserTemplateSuccess([]));
        this.setState({
            templateCaterogy: id
        });
    };
    render = () => {
        const { step } = this.state;
        const { steps } = this.props;
        return (
            <React.Fragment>
                <Stepper activeStep={step}>
                    {steps.map(step => {
                        return (
                            <Step key={step.id}>
                                <StepLabel color="secondary">{step.label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {this.stepContent(step)}
            </React.Fragment>
        );
    };
}

AddContent.defaultProps = defaultProps;
AddContent.propTypes = propTypes;

const mapDispatchToProps = dispatch => {
    return {
        deletePage: pageKey => {
            dispatch(actions.deletePage(pageKey));
        }
    };
};

const mapStateToProps = (state, ownedProps) => {
    return {
        groups: state && state[REDUCER_NAME] && state[REDUCER_NAME].groups
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(AddContent));

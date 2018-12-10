import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "modules/common";
import { I18n } from "react-i18nify";
import { Grid, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    backButton: {
        marginRight: theme.spacing.unit
    },
    formItem: {
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2
        // height: theme.spacing.unit * 6
    },
    formItem2: {
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
        height: theme.spacing.unit * 6
    },
    formItemCode: {
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2
    },
    gridContainer: {
        width: "100%",
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
    },
    formContent: {
        padding: "16px 0px"
    },
    codeButton: {
        width: "75%",
        height: theme.spacing.unit * 6,
        marginRight: theme.spacing.unit * 2,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 48px"
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    actionButton: {
        // marginRight: "-6px",
        display: "flex",
        justifyContent: "flex-end"
    },
    email: {
        marginBottom: theme.spacing.unit * 2,
        width: "100%"
    }
});

function getSteps() {
    // return [I18n.t("login.stepper1Label"), I18n.t("login.stepper2Label"), I18n.t("login.stepper3Label")];
    return ["Please enter your email", I18n.t("login.stepper3Label")];
}

class HorizontalLabelPositionBelowStepper extends React.Component {
    static defaultProps = {
        emailReg: new RegExp("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"),
        emailmsg: "eg: Tom@ncsi.com"
    };
    state = {
        activeStep: 0,
        group: "",
        userId: "",
        codeBase64: "",
        captchaToken: ""
    };
    componentDidMount() {
        this.props.getVerificationCode();
    }
    componentWillReceiveProps(nextProps) {
        const { verificationCode = [] } = nextProps;
        if (verificationCode.length && !_.isEqual(verificationCode, this.props.verificationCode)) {
            const urlCreator = window.URL || window.webkitURL;
            let url =
                verificationCode && verificationCode[0] ? urlCreator.createObjectURL(verificationCode[0]) : undefined;
            this.setState({
                codeBase64: url,
                captchaToken: verificationCode[1].headers.get("captcha-token")
            });
        }
    }
    callCode = () => {
        this.props.getVerificationCode();
    };
    handleChange = name => e => {
        this.setState({ [name]: e.target.value }, () => {
            const { captchaToken, code, email } = this.state;
            this.props.getDatas({ code, email, captchaToken });
        });
    };
    generateAccountStep() {
        const { group = "" } = this.state;
        return (
            <TextField
                value={group}
                label={I18n.t("login.stepper1Text")}
                onChange={this.handleChange("group")}
                style={{ width: "100%" }}
            />
        );
    }
    generateUserIdStep() {
        const { userId = "" } = this.state;
        return (
            <TextField
                value={userId}
                label={"Email"}
                onChange={this.handleChange("userId")}
                style={{ width: "100%" }}
            />
        );
    }
    generateEmailLink() {
        // const { email = "" } = this.state;
        // const { classes } = this.props;
        return (
            <address>
                {/* <TextField
                    value={email}
                    label="Email"
                    onChange={this.handleChange("email")}
                    className={classes.email}
                /> */}
                <Typography>
                    {I18n.t("login.stepper3Text")}
                    <a href="mailto:intellisurf-admin@singtel.com">Admin</a>.
                </Typography>
            </address>
        );
    }
    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return this.generateUserIdStep();
            // return this.generateAccountStep();
            case 1:
                return this.generateEmailLink();
            // return this.generateUserIdStep();
            case 2:
                return this.generateEmailLink();
            default:
                return "Uknown stepIndex";
        }
    }

    handleNext = () => {
        const { activeStep } = this.state;
        const newStep = activeStep + 1;
        const len = getSteps().length;
        if (len <= newStep) {
            this.handleFinish();
            return;
        }
        this.setState({
            activeStep: activeStep + 1
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1
        });
    };

    handleFinish = () => {
        const open = false;
        const { userId } = this.state;
        this.props.forgotPassword(userId);
        this.props.onForgotEvent(open);
    };
    render() {
        const { classes, emailmsg, emailReg } = this.props;
        const { email = "", code = "", codeBase64 } = this.state;
        let error = !emailReg.test(email);
        return (
            <div className={classes.root}>
                <Typography>{I18n.t("login.forgotPasswordContent")}</Typography>
                <div className={classes.formContent}>
                    <Grid container spacing={24}>
                        <Grid className={classes.gridContainer}>
                            <TextField
                                className={classes.formItem}
                                value={email}
                                label={I18n.t("login.email")}
                                required
                                onChange={this.handleChange("email")}
                                style={{ width: "100%" }}
                                error={error && !!email}
                                helperText={error && !!email ? emailmsg : ""}
                            />
                        </Grid>
                        <Grid className={classes.gridContainer}>
                            <div className={classes.formItemCode}>
                                <Typography>{I18n.t("login.forgotPasswordVerCode")}</Typography>
                                <Button
                                    onClick={this.callCode}
                                    className={classes.codeButton}
                                    style={{ backgroundImage: `url(${codeBase64})` }}
                                >
                                    {""}
                                </Button>
                                <IconButton onClick={this.callCode}>
                                    <FontAwesomeIcon icon={faRedo} size="xs" />
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid className={classes.gridContainer}>
                            <TextField
                                value={code}
                                className={classes.formItem2}
                                label={I18n.t("login.enterCode")}
                                onChange={this.handleChange("code")}
                                style={{ width: "100%" }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

HorizontalLabelPositionBelowStepper.propTypes = {
    classes: PropTypes.object
};
// const mapStateToProps = (state, ownProps) => {
//     return {
//         verificationCode: state[authReducerName] && state[authReducerName].verificationCode,
//         open: state[authReducerName] && state[authReducerName].open
//     };
// };
export default withStyles(styles)(HorizontalLabelPositionBelowStepper);

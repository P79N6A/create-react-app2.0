import React from "react";
import PropTypes from "prop-types";
import { Dialog, Form } from "../../common/index";
import * as actions from "../funcs/actions";
import { connect } from "react-redux";
import { REDUCER_NAME } from "../funcs/constants";
import { resetPassword as columns } from "../funcs/constants";
import { reportError } from "../../common/validator";
import _ from "lodash";
class ResetPassword extends React.Component {
    state = { open: true, columns: [], validateResult: false };
    formData = {};
    componentDidMount() {
        this.setState({
            columns: _.cloneDeep(columns)
        });
    }
    getFormData = (datas, validateResult) => {
        this.formData = datas;
        const { columns } = this.state;
        let root = columns.map(n => {
            n.value = datas[n.name];
            return n;
        });
        this.setState({
            columns: root,
            validateResult
        });
    };
    componentWillReceiveProps(nextProps) {
        const { open } = nextProps;
        if (!open) {
            this.setState({
                columns: _.cloneDeep(columns)
            });
        }
    }
    cancle = () => {
        this.props.resetPasswordDialog(false);
    };
    submit = () => {
        const { dataSource } = this.props;
        const { password, confirmpassword } = this.formData;
        let postData = { userid: dataSource.userid, newPassword: password, confirmPassword: confirmpassword };
        this.props.resetPassword(postData);
        this.props.resetPasswordDialog(false);
    };
    render() {
        const { open } = this.props;
        const { columns } = this.state;
        let validateResult = !reportError(
            true,
            columns,
            columns.length
                ? Object.assign.apply({}, columns.map(n => ({ [n.name]: n.value || "" })))
                : {}
        );
        return (
            <Dialog
                title={"Reset Password"}
                cancle={this.cancle}
                open={open}
                submit={this.submit}
                submitText="ok"
                minWidth={"auto"}
                isDisabled={validateResult}
            >
                <Form validate={true} columns={columns} getFormData={this.getFormData} />
            </Dialog>
        );
    }
}
ResetPassword.propTypes = {
    classes: PropTypes.object
};
ResetPassword.defaultProps = {};

const mapStateToProps = state => {
    return {
        userData: state[REDUCER_NAME] && state[REDUCER_NAME].userData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        resetPassword: postData => {
            dispatch(actions.resetPassword(postData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);

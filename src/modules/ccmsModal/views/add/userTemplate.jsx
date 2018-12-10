import React from "react";
import PropTypes, { string } from "prop-types";
import { connect } from "react-redux";
import { Template } from "./statics";
import { REDUCER_NAME } from "../../funcs/constants";
import { getUserTemplate, deleteUserTemplate } from "../../funcs/actions";
import { MenuItem } from "@material-ui/core";
import { Select, InputLabel } from "modules/common";
import { FormControl } from "@material-ui/core";
import _ from "lodash";

const defaultProps = {
    templates: [],
    templateSeqId: null
};
const propTypes = {
    templates: PropTypes.array,
    templateSeqId: PropTypes.oneOf([null, string])
};

class UserTemplate extends React.Component {
    state = {};
    componentDidMount = () => {
        const { category } = this.props;
        this.props.getUserTemplate(category);
    };
    componentWillReceiveProps = nextProps => {
        const { category } = this.props;
        const { category: newCategory } = nextProps;
        if (_.isEqual(category, newCategory)) return;
        this.props.getUserTemplate(newCategory);
    };
    handleDelete = template => {
        const { id } = template;
        this.props.deleteUserTemplate(id);
    };
    handleSelect = template => {
        this.props.onChange(template);
    };
    render = () => {
        const {} = this.state;
        const { templates, category, categories, onSelect, selectedSeqId } = this.props;
        return (
            <React.Fragment>
                <FormControl fullWidth>
                    <InputLabel>Template</InputLabel>
                    <Select value={category}>
                        {categories.map(cate => {
                            return (
                                <MenuItem key={cate.id} value={cate.id} onClickCapture={() => onSelect(cate)}>
                                    {cate.label}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <Template
                    category={category}
                    seqId={selectedSeqId}
                    templates={templates}
                    onDelete={this.handleDelete}
                    onSelect={this.handleSelect}
                />
            </React.Fragment>
        );
    };
}

UserTemplate.defaultProps = defaultProps;
UserTemplate.propTypes = propTypes;

const mapDispatchToProps = dispatch => {
    return {
        getUserTemplate: category => {
            dispatch(getUserTemplate(category));
        },
        deleteUserTemplate: id => {
            dispatch(deleteUserTemplate(id));
        }
    };
};

const mapStateToProps = (state, ownedProps) => {
    return {
        templates: state && state[REDUCER_NAME] && state[REDUCER_NAME].templates
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTemplate);

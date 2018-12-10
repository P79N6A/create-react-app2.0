import React from "react";
import PropTypes from "prop-types";
import { JSONSchema, validation } from "modules/accountmanagement/common/jsonSchema/index";
import TabView from "../tabView";
import schema from "../../schema.json";
const style = {
    marginTop: 16
};
class EditGroup extends React.Component {
    state = {
        initJson: {}
    };
    componentWillMount() {
        const { currGroupData = {} } = this.props;
        const { applications, users, editable, ...otherProps } = currGroupData;
        this.setState(
            {
                initJson: otherProps
            },
            () => {
                const { initJson } = this.state;
                this.props.getFormData(initJson, validation(initJson, schema));
            }
        );
    }
    getDatas = (values, schema, validationRes) => {
        this.props.getFormData(values, validationRes);
    };
    render() {
        const { initJson } = this.state;
        return (
            <div>
                <JSONSchema
                    schema={schema}
                    initState={initJson}
                    getDatas={this.getDatas}
                    aop={{
                        application: {
                            comp: "application",
                            view: props => {
                                return (
                                    <div style={style}>
                                        <TabView {...props} editMode={this.props.editMode} />
                                    </div>
                                );
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
EditGroup.defaultProps = {};
EditGroup.propTypes = {
    classes: PropTypes.object
};
export default EditGroup;

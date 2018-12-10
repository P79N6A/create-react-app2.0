import React from "react";
import PropTypes from "prop-types";
import { JSONSchema } from "modules/accountmanagement/common/jsonSchema/index";
import TabView from "../tabView";
import schema from "../../schema.json";
// import classNames from "classnames";
const style = {
    marginTop: 16
};
class ViewGroup extends React.Component {
    render() {
        const { currGroupData = {} } = this.props;
        const { applications, users, editable, ...otherProps } = currGroupData;
        return (
            <JSONSchema
                schema={schema}
                initState={otherProps}
                getDatas={this.getDatas}
                mode="view"
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
        );
    }
}
ViewGroup.defaultProps = {};
ViewGroup.propTypes = {
    classes: PropTypes.object
};
export default ViewGroup;

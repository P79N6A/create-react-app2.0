import React from "react";
import PropTypes from "prop-types";
import { JSONSchema } from "modules/accountmanagement/common/jsonSchema/index";
import TabView from "../tabView";
// import { TabView } from "../../../common/index";
import schema from "../../schema.json";
const style = {
    marginTop: 16
};
class AddGroup extends React.Component {
    getDatas = (values, schema, validationRes) => {
        this.props.getFormData(values, validationRes);
    };
    render() {
        return (
            <div>
                <JSONSchema
                    schema={schema}
                    initState={{}}
                    getDatas={this.getDatas}
                    aop={{
                        application: {
                            comp: "application",
                            view: props => {
                                return (
                                    <div style={style}>
                                        <TabView editMode={this.props.editMode} />
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
AddGroup.defaultProps = {};
AddGroup.propTypes = {
    classes: PropTypes.object
};
export default AddGroup;

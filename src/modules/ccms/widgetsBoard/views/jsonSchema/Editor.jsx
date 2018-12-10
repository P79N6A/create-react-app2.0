import React from "react";
import ObjectEditor from "./object-editor";
import ArrayEditor from "./array-editor";
import NumberEditor from "./number-editor";
import BooleanEditor from "./boolean-editor";
// import NullEditor from "./null-editor";
import StringEditor from "./string-editor";

// schema ex:
// {
//     "type": "string",
//     "header": "schema",
//      "default": "value"
//     "path": "&/chartConfig/Xaxis/value",
//     "options": {
//         "source": "&/dataSource/options",
//         "sender": [{
//             "value": "control-Checkbox-disable",
//             "trigger": "&/dataSource/options",
//             "show": false
//         }],
//         "link": ["control-barline-display"],
//         "dataLink": "control-data"
//     }
// }

class Editor extends React.Component {
    render() {
        switch (this.props.schema.type) {
            case "object":
                return <ObjectEditor {...this.props} />;
            case "array":
                return <ArrayEditor {...this.props} />;
            case "number":
            case "integer":
                return <NumberEditor {...this.props} />;
            case "boolean":
                return <BooleanEditor {...this.props} />;
            // case "null":
                // return <NullEditor {...this.props} />;
            case "string":
                return <StringEditor {...this.props} />;
            default:
                return null;
        }
    }
}

export default Editor;

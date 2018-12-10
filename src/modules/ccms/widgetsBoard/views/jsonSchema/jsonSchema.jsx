import React from "react";
import Editor from "./Editor";
import { fomartSchema } from "../../funcs/utils";

// const defaultSchema = {
//     name: "List of Devices",
//     subTitle: "Topology subtitle",
//     multipleSelect: true,
//     columnConfig: [
//         {
//             columnName: "DisplayName",
//             defaultSelect: true
//         },
//         {
//             columnName: "Name",
//             defaultSelect: true
//         },
//         {
//             columnName: "Status",
//             defaultSelect: true
//         },
//         {
//             columnName: "DeviceType",
//             defaultSelect: true
//         },
//         {
//             columnName: "Location",
//             defaultSelect: false
//         },
//         {
//             columnName: "Address",
//             defaultSelect: false
//         },
//         {
//             columnName: "IotTopologyId",
//             defaultSelect: false
//         },
//         {
//             columnName: "ResourcePath",
//             defaultSelect: false
//         }
//     ],
//     defaultSort: "displayName asc",
//     defaultPageSize: 10
// };

class JsonEditor extends React.Component {
    state = { initState: {} };

    updateValue = (value, path) => {
        // this.setState({
        //     initState: changeState
        // });
        // this.props.updateValue(changeState);
    };

    setValue = (value, path) => {
        // const { initState } = this.state;
        let pathArr = path.split("/");
        let curr = {};
        // pathArr.map(())
        for (let i = 0, len = pathArr.length; i < len; i++) {
            if (i !== len - 1 && i !== 0) {
                curr[pathArr[i - 1]] = {
                    [pathArr[i]]: {}
                };
            } else if (i === 0) {
                curr[pathArr[i]] = 222;
            }
        }
        // initState = Object.assign({}, initState, {
        //     // pathArr
        // });
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            initState: nextProps.initState
        });
    }
    render() {
        const { initState } = this.props;
        let schema = [];
        fomartSchema(initState, schema);
        return <Editor schema={schema} initState={initState} updateValue={this.updateValue} />;
    }
}

export default JsonEditor;

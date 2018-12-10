/*
* =========================================================================
*  Copyright (C)2018 NCS Pte. Ltd. All Rights Reserved
*
*  This software is confidential and proprietary to NCS Pte. Ltd. You shall
*  use this software only in accordance with the terms of the license
*  agreement you entered into with NCS.  No aspect or part or all of this
*  software may be reproduced, modified or disclosed without full and
*  direct written authorisation from NCS.
*
*  NCS SUPPLIES THIS SOFTWARE ON AN "AS IS" BASIS. NCS MAKES NO
*  REPRESENTATIONS OR WARRANTIES, EITHER EXPRESSLY OR IMPLIEDLY, ABOUT THE
*  SUITABILITY OR NON-INFRINGEMENT OF THE SOFTWARE. NCS SHALL NOT BE LIABLE
*  FOR ANY LOSSES OR DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING,
*  MODIFYING OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
*
*  =========================================================================
*/
/**
 * Created by Jia Luo on 27/07/2018.
 */
import React from "react";
import Editor from "./Editor";
import View from "./View";
import { fomartSchema, validation } from "./funcs/utils";
import Grid from "@material-ui/core/Grid";
import Layout from "./layout";
import _ from "lodash";
import "./styles/index.less";

class JsonEditor extends React.Component {
    static defaultProps = {
        getDatas: () => {}
    };
    cache = {};
    state = { initState: this.props.initState };
    updateValue = (value, path) => {
        const { initState } = this.state;
        const { initState: initState2 } = this.props;
        let cacheData = Object.assign({}, initState2, initState, { [path]: value });
        this.cache = Object.assign({}, this.cache, cacheData);
        this.setState(
            {
                initState: this.cache
            },
            () => {
                const { initState } = this.state;
                const { schema } = this.props;
                this.props.getDatas(initState, schema, validation(initState, schema));
            }
        );
    };
    componentWillReceiveProps(nextProps) {
        const { initState } = nextProps;
        if (!_.isEqual(initState, this.props.initState)) {
            this.setState({
                initState
            });
        }
    }
    render() {
        const { initState } = this.state;
        const { aop = null, schema = {}, spacing = 24, property = {}, mode = "add" } = this.props;
        const { containers = {} } = property;
        let schemas = fomartSchema(initState, schema);
        return (
            <Grid className="schema-layout-container" {...containers} container spacing={spacing}>
                {schemas.map(schema => {
                    const { property = {} } = schema;
                    const { layout = { xs: spacing / 2 } } = property;
                    return (
                        <Layout {...layout} key={schema.name}>
                            {mode === "add" ? (
                                <Editor
                                    key={schema.name}
                                    initState={initState}
                                    schema={schema}
                                    aop={aop}
                                    mode={mode}
                                    _updatevalue={this.updateValue}
                                />
                            ) : (
                                <View key={schema.name} initState={initState} schema={schema} aop={aop} mode={mode} />
                            )}
                        </Layout>
                    );
                })}
            </Grid>
        );
    }
}

export default JsonEditor;

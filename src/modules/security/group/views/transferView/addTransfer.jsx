import React from "react";
import { Transfer } from "../../../common/index";

import { connect } from "react-redux";
import { resourcePathActions, resourcePathReducerName } from "../../../resource_path/index";
import * as actions from "../../funcs/actions";
import { REDUCER_NAME } from "../../funcs/constants";
import _ from "lodash";

class Transfers extends React.Component {
    state = {
        targetKeys: [],
        tempData: []
    };
    flag = true;
    componentDidMount() {
        const { searchData, editMode } = this.props;
        const { grpid, ...otherData } = searchData;
        this.props.getResourcePath(Object.assign({}, otherData, { pageno: 1, address: "" }));
        this.props.applicationidFunc([]);
        this.setState({
            editMode,
            targetKeys: [],
            tempData: []
        });
    }

    componentWillReceiveProps(nextProps) {
        const { group = {}, labelKey, valueKey } = nextProps;
        let { applications = [] } = group;
        let { tempData = [] } = this.state;
        let rootTempData = applications.map(n => ({ [labelKey]: n.displayname, [valueKey]: n.applicationid }));
        rootTempData = _.uniq(rootTempData.concat(tempData).map(n => JSON.stringify(n))).map(n => JSON.parse(n));
        this.setState({
            tempData: rootTempData
        });
    }

    handleChange = (targetKeys, e) => {
        const { applications, valueKey } = this.props;
        const { tempData } = this.state;
        let noRepatData = _.uniq(applications.concat(tempData).map(n => JSON.stringify(n))).map(n => JSON.parse(n));
        this.props.applicationidFunc(targetKeys.map(n => ({ applicationid: n })));
        this.setState({ targetKeys, tempData: noRepatData.filter(n => ~targetKeys.indexOf(n[valueKey])) });
    };

    onScroll = (dir, e) => {
        let target = e.target;
        const { pagination, searchData } = this.props;
        const { totalpages, currentpage } = pagination;
        if (
            dir === "left" &&
            target.clientHeight + target.scrollTop === target.scrollHeight &&
            currentpage < totalpages &&
            this.flag === true
        ) {
            const { grpid, ...otherData } = searchData;
            this.props.getResourcePath(Object.assign({}, otherData, { pageno: currentpage + 1 }), true);
        }
    };

    onSearchChange = (dir, e) => {
        this.flag = false;
        let value = e.target.value;
        setTimeout(() => {
            if (dir === "left") {
                const { searchData } = this.props;
                const { grpid, ...otherData } = searchData;
                this.props.getResourcePath(Object.assign({}, otherData, { pageno: 1, address: value }));
                this.flag = true;
            }
        }, 100);
    };

    render() {
        let { applications, labelKey, valueKey, isLoading = false } = this.props;
        const { targetKeys, tempData = [] } = this.state;
        applications = _.uniq(applications.concat(tempData).map(n => JSON.stringify(n))).map(n => JSON.parse(n));
        return (
            <Transfer
                rowKey={record => record[valueKey]}
                titles={["Source", "Target"]}
                dataSource={applications}
                showSearch
                listStyle={{
                    width: 253,
                    height: 300
                }}
                operations={["", ""]}
                targetKeys={targetKeys}
                onChange={this.handleChange}
                onSearchChange={this.onSearchChange}
                render={item => `${item[labelKey]}`}
                lazy={{ height: 32, offset: 32 }}
                onScroll={this.onScroll}
                isLoading={isLoading}
                // footer={this.renderFooter}
            />
        );
    }
}

Transfers.defaultProps = {
    labelKey: "address.displayName",
    valueKey: "address.iotTopologyId"
};

const mapStateToProps = state => {
    return {
        searchData: state[REDUCER_NAME] && state[REDUCER_NAME].applicationSearchData,
        pagination: state[resourcePathReducerName] && state[resourcePathReducerName].pagination,
        application: state[REDUCER_NAME] && state[REDUCER_NAME].application,
        applications: state[resourcePathReducerName] && state[resourcePathReducerName].payload,
        currGroupData: state[REDUCER_NAME] && state[REDUCER_NAME].currGroupData,
        group: state[REDUCER_NAME] && state[REDUCER_NAME].group,
        drawerOpen: state[REDUCER_NAME] && state[REDUCER_NAME].group,
        isLoading: state[REDUCER_NAME] && state[REDUCER_NAME].transferLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        reset: reset => {
            dispatch(actions.reset(reset));
        },
        getResourcePath: (searchData, flag) => {
            dispatch(resourcePathActions.getResourcePath(searchData, flag));
        },
        coverApplications: applications => {
            dispatch(resourcePathActions.coverApplications(applications));
        },
        getApplicationFromGrpId: searchData => {
            dispatch(actions.getApplicationFromGrpId(searchData));
        },
        applicationidFunc: visualizations => {
            dispatch(actions.applicationidFunc(visualizations));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Transfers);

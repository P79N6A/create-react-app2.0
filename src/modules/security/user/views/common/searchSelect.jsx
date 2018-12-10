import React from "react";
import PropTypes from "prop-types";
import { SearchSelect } from "modules/common/index";
import * as actions from "../../funcs/actions";
import _ from "lodash";
let timer = null;
class SearchSelects extends React.Component {
    state = {
        groupvalue: [],
        origin: [],
        currList: [],
        loading: false,
        disabled: false
    };
    componentDidMount() {
        const { dispatch } = this.props;
        let grpSearchData = Object.assign({}, this.props.grpSearchData, { pageno: 1 });
        dispatch(actions.reset({ grpSearchData }));
        dispatch(actions.getGroup(grpSearchData));
    }
    handleSearch = grpname => {
        const { dispatch } = this.props;
        let grpSearchData = Object.assign({}, this.props.grpSearchData, { grpname, pageno: 1 });
        timer && clearTimeout(timer);
        this.setState({
            data: [],
            loading: true,
            disabled: true
        });
        timer = setTimeout(() => {
            dispatch(actions.reset({ grpSearchData }));
            dispatch(actions.getGroup(grpSearchData));
        }, 1000);
    };
    handleFilter = selected => {
        clearTimeout(timer);
        let rootCheck = selected.map(n => n["value"]);
        this.setState(
            {
                groupvalue: selected,
                currList: selected
            },
            () => {
                this.props._updatevalue(rootCheck, this.props.name);
            }
        );
    };
    handleScrollToBtm = () => {
        const { dispatch } = this.props;
        const { pageno = 1 } = this.props.grpSearchData;
        const { totalpages } = this.props.grpPagination;
        if (totalpages < pageno + 1) return;
        let grpSearchData = Object.assign({}, this.props.grpSearchData, { pageno: pageno + 1 });
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.setState(
                {
                    loading: true,
                    disabled: true
                },
                () => {
                    dispatch(actions.reset({ grpSearchData }));
                    dispatch(actions.getGroup(grpSearchData, true));
                }
            );
        }, 1000);
    };
    componentWillReceiveProps(nextProps) {
        const { currUserData = {} } = nextProps;
        const { groups = [] } = currUserData;
        if (!_.isEqual(nextProps.currUserData, this.props.currUserData)) {
            this.setState(
                {
                    groupvalue: groups.map(n => ({ value: n["grpid"], label: n["grpname"] })),
                    origin: groups.map(n => ({ value: n["grpid"], label: n["grpname"] }))
                },
                () => {
                    const { groupvalue } = this.state;
                    const { name } = this.props;
                    this.props._updatevalue(groupvalue.map(n => n.value), name);
                }
            );
        }
        if (_.isEqual(this.props.opts, nextProps.opts)) {
            this.setState({
                loading: false,
                disabled: false
            });
        }
    }
    render() {
        const { groupvalue, origin, currList } = this.state;
        const { label, placeholder, opts = [], drawerLoading = false } = this.props;
        let options = opts
            .map(n => ({ value: n["grpid"], label: n["grpname"] }))
            .concat(origin)
            .concat(currList);
        options = _.uniq(options.map(n => JSON.stringify(n))).map(n => JSON.parse(n));
        return (
            <SearchSelect
                placeholder={placeholder}
                onMenuScrollToBottom={this.handleScrollToBtm}
                isLoading={drawerLoading}
                // isDisabled={disabled}
                onInputChange={this.handleSearch}
                onChange={this.handleFilter}
                label={label}
                value={groupvalue}
                isMulti={true}
                options={options}
                required
            />
        );
    }
}
SearchSelects.defaultProps = {};
SearchSelects.propTypes = {
    classes: PropTypes.object
};
export default SearchSelects;

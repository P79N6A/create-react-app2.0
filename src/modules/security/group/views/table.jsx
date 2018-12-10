import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Typography, withStyles } from "@material-ui/core";
import { Table } from "../../common/index";
import { I18n } from "react-i18nify";
import store from "commons/store";
import DeleteDialog from "./deleteDialog";
import { actions as message } from "modules/messageCenter";
const styles = theme => ({
    "progress-cont-bgcolor": {
        backgroundColor: theme.palette.background.paper
    }
});
class Tables extends React.Component {
    state = {
        highlight: -1
    };
    actionContent = () => {
        return [
            {
                icon: "edit_icon",
                func: (n, i) => e => {
                    e.stopPropagation();
                    if (!n.editable) {
                        store.dispatch(
                            message.warn(I18n.t("security.group.notAllowEditMessage"), I18n.t("security.moduleName"))
                        );
                        return;
                    }
                    this.props.getGroupFromId(n.grpid);
                    this.props.changeMode("edit");
                    this.props.reset({ currGroupData: n, application: n.application || "", drawerOpen: true });
                    const { userSearchData } = this.props;
                    let userSearchDatas = Object.assign({}, userSearchData, {
                        grpid: n.grpid,
                        limit: 10,
                        pageno: 1,
                        username: ""
                    });
                    this.props.reset({ userSearchData: userSearchDatas });
                    this.props.getUserFromGrpId(userSearchDatas);
                    this.setState({
                        highlight: i
                    });
                }
            }
        ];
    };
    clickRow = (data, i) => {
        const { userSearchData } = this.props;
        this.props.reset({ currGroupData: data, application: data.application || "", drawerOpen: true });
        this.props.getGroupFromId(data.grpid);
        let userSearchDatas = Object.assign({}, userSearchData, {
            grpid: data.grpid,
            limit: 10,
            pageno: 1,
            username: ""
        });
        this.props.reset({ userSearchData: userSearchDatas });
        this.props.getUserFromGrpId(userSearchDatas);
        this.props.changeMode("view");
        this.setState({
            highlight: i
        });
    };
    handleChangePage = page => {
        let searchData = Object.assign({}, this.props.searchData, { pageno: page + 1 });
        this.props.reset({ searchData: searchData, drawerOpen: false, group: {} });
        this.props.getGroup(searchData);
    };
    handleChangeRowsPerPage = event => {
        let limit = +event;
        let searchData = Object.assign({}, this.props.searchData, { limit, pageno: 1 });
        this.props.reset({ searchData: searchData, drawerOpen: false, group: {} });
        this.props.getGroup(searchData);
    };
    sort = (order, sortkey) => {
        sortkey = sortkey === "grpname" ? "grpName" : sortkey === "grpdescription" ? "grpDescription" : "";
        order = order === "asc" ? true : false;
        let searchData = Object.assign({}, this.props.searchData, { sortkey, asc: order });
        this.props.reset({ searchData: searchData, drawerOpen: false, group: {} });
        this.props.getGroup(searchData);
    };
    deleteHandle = selected => {
        const { groupList } = this.props;
        this.setState({
            deleteOpen: true,
            currGroup: selected.map(n => {
                return { grpid: n };
            }),
            selected,
            groupName: groupList
                .filter(n => ~selected.indexOf(n.grpid))
                .map(n => n.grpname)
                .join(", ")
        });
    };
    onCancel = () => {
        this.setState({
            deleteOpen: false
        });
    };
    onSubmit = () => {
        const { currGroup } = this.state;
        const { searchData } = this.props;
        this.props.deleteGroup(currGroup, searchData);
        this.setState({
            deleteOpen: false,
            currGroup: []
        });
    };
    render() {
        const { columnDatas, pagination = {}, classes, drawerOpen = false, editMode, groupList = [] } = this.props;
        const { currentpage = 1, limit = 20, totalrecords = 0 } = pagination;
        const { deleteOpen = false, groupName = "" } = this.state;
        return (
            <div
                style={{
                    height: "calc(100% - 120px)",
                    position: "relative",
                    // backgroundColor: theme.palette.background.paper
                }}
            >
                <DeleteDialog name={groupName} open={deleteOpen} onCancel={this.onCancel} onSubmit={this.onSubmit} />
                {columnDatas.length === 0 ? (
                    <div className={classnames("progress-cont", classes["progress-cont-bgcolor"])}>
                        <Typography variant="caption" gutterBottom align="center" className="no-data">
                            {I18n.t("common.NoColumnsSelected")}
                        </Typography>
                    </div>
                ) : (
                    <Table
                        deleteHandle={this.deleteHandle}
                        select
                        selectField="grpid"
                        icons={[]}
                        columnData={columnDatas.filter(n => n.label !== "Actions")}
                        tableData={groupList}
                        clickRow={this.clickRow}
                        action={!!columnDatas.find(n => n.label === "Actions")}
                        actionContent={this.actionContent()}
                        actionNumeric={true}
                        page={currentpage - 1}
                        rowsPerPage={limit}
                        count={totalrecords}
                        backendPagination={true}
                        handleChangePage={this.handleChangePage}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        highlight={drawerOpen && editMode !== "add" ? this.state.highlight : false}
                        sort={this.sort}
                    />
                )}
            </div>
        );
    }
}
Tables.defaultProps = {};
Tables.propTypes = {
    classes: PropTypes.object
};
export default withStyles(styles)(Tables);

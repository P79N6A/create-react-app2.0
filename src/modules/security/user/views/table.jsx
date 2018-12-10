import React from "react";
import PropTypes from "prop-types";
import { Table } from "../../common/index";
import { Typography, withStyles } from "@material-ui/core";
import "../styles/list.less";
import { I18n } from "react-i18nify";
import { theme } from "modules/theme";
import classnames from "classnames";
const styles = theme => ({
    "progress-cont-bgcolor": {
        backgroundColor: theme.palette.background.paper
    }
});
class Tables extends React.Component {
    state = { highlight: -1 };
    clickRow = (n, i) => {
        this.ClickRowAction(n, i);
        this.props.editModeFunc("view");
    };
    actionContent = () => {
        return [
            {
                icon: "edit_icon",
                func: (n, i) => e => {
                    e.stopPropagation();
                    this.ClickRowAction(n, i);
                    this.props.editModeFunc("edit");
                }
            },
            {
                // visible: "",
                visible: n => {
                    if (n) {
                        return n.userstatus === "0";
                    }
                },
                title: I18n.t("security.users.sendEmailToUser"),
                icon: "email",
                func: (n, i) => e => {
                    e.stopPropagation();
                    if (n.userid) {
                        this.props.sendEmailToUser(n.userid);
                    }
                }
            }
        ];
    };
    ClickRowAction = (n, i) => {
        if (n && n.userid) {
            this.props.reset({ openDrawer: true });
            this.props.getUserFromId(n.userid);
            this.setState({
                highlight: i
            });
        }
    };
    deleteHandle = selected => {
        this.props.reset({
            deleteOpen: true,
            deleteData: selected
        });
    };
    sort = (order, sortkey) => {
        let searchData = Object.assign({}, this.props.searchData, { sortkey, order });
        this.props.reset({ searchData: searchData, openDrawer: false, currUserData: {}, avator: [] });
        this.props.getUser(searchData);
    };
    handleChangePage = page => {
        let searchData = Object.assign({}, this.props.searchData, { pageno: page + 1 });
        this.props.reset({ searchData: searchData, openDrawer: false, account: {} });
        this.props.getUser(searchData);
    };
    handleChangeRowsPerPage = event => {
        let limit = +event;
        let searchData = Object.assign({}, this.props.searchData, { limit, pageno: 1 });
        this.props.reset({ searchData: searchData, openDrawer: false, account: {} });
        this.props.getUser(searchData);
    };
    render() {
        const { pagination = {}, columnDatas = [], editMode, openDrawer, userList = [], classes } = this.props;
        const { currentpage = 1, limit = 20, totalrecords = 0 } = pagination;
        return (
            <div
                style={{
                    height: "calc(100% - 120px)",
                    position: "relative",
                    backgroundColor: theme.palette.background.paper
                }}
            >
                {columnDatas.length ? (
                    <Table
                        deleteHandle={this.deleteHandle}
                        select
                        selectField="userid"
                        icons={[]}
                        columnData={columnDatas.filter(n => n.label !== "Actions")}
                        tableData={userList}
                        clickRow={this.clickRow}
                        action={!!columnDatas.find(n => n.label === "Actions")}
                        actionContent={this.actionContent()}
                        actionNumeric={false}
                        page={currentpage - 1}
                        rowsPerPage={limit}
                        count={totalrecords}
                        backendPagination={true}
                        handleChangePage={this.handleChangePage}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        highlight={openDrawer && editMode !== "add" ? this.state.highlight : false}
                        sort={this.sort}
                    />
                ) : null}

                {columnDatas.length === 0 ? (
                    <div className={classnames("progress-cont", classes["progress-cont-bgcolor"])}>
                        <Typography variant="caption" gutterBottom align="center" className="no-data">
                            {I18n.t("common.NoColumnsSelected")}
                        </Typography>
                    </div>
                ) : null}
            </div>
        );
    }
}
Tables.propTypes = {
    classes: PropTypes.object
};
Tables.defaultProps = {
    editModeFunc: () => {}
};
export default withStyles(styles)(Tables);

import React from "react";
import PropTypes from "prop-types";
import { Header, ColumnFilter } from "../../common/index";
import { I18n } from "react-i18nify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Search } from "../../common/index";
import { columnDatas } from "../funcs/constants";
class Headers extends React.Component {
    state = {
        search: ""
    };
    checkClick = checked => {
        this.setState({
            columnDatas: columnDatas.filter(n => ~checked.indexOf(n.label))
        });
    };
    searchHandle = value => {
        let searchData = Object.assign({}, this.props.searchData, { grpname: value, pageno: 1 });
        this.setState({
            search: value
        });
        this.props.reset({ seachValue: value, searchData: searchData });
        this.props.getGroup(searchData);
    };
    getIcons = () => {
        return [
            {
                visible: !this.state.mode,
                content: () => {
                    return (
                        <Search
                            key={"search"}
                            placeholder={I18n.t("security.userGroups.SearchByGroupName")}
                            searchHandle={this.searchHandle}
                        />
                    );
                }
            },
            {
                // name: "add",
                awesome: faPlus,
                func: () => {
                    const { addGroupField } = this.state;
                    this.props.reset({ drawerOpen: true });
                    this.props.changeMode("add");
                    // this.setState({
                    //     formTitle: I18n.t("security.userGroups.AddUserGroup"),
                    //     groupId: "",
                    //     editMode: "add",
                    //     open: true,
                    //     groupCurr: {},
                    //     readOnly: false,
                    //     validate: true,
                    //     footerTitle: "",
                    //     addGroupField: addGroupField.map(item => {
                    //         const { readOnly, ...data } = item;
                    //         if (typeof data.value === "string" || typeof data.value === "undefined") {
                    //             data.value = "";
                    //         } else {
                    //             data.value = [];
                    //         }
                    //         return data;
                    //     })
                    // });
                }
            },
            {
                content: () => {
                    return (
                        <ColumnFilter
                            key={"filter"}
                            icon="view_week"
                            checked={[]}
                            checkClick={this.props.checkClick}
                            options={columnDatas.map(n => n.label)}
                        />
                    );
                }
            }
        ];
    };
    render() {
        return (
            <Header
                title={I18n.t("security.UserManagement")}
                icons={this.getIcons()}
                style={{ boxShadow: "none", zIndex: 0 }}
            />
        );
    }
}
Headers.defaultProps = {};
Headers.propTypes = {
    classes: PropTypes.object
};
export default Headers;

import React from "react";
// import { Link } from "react-router-dom";
import { IconButton, List, ListItem, ListItemIcon, Icon, ListItemText, Collapse, Divider } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import PermissionComponent from "commons/components/permissionComponent";
import SURF_LOGO from "../images/SURF_Landscape-RWH.png";

export const MenuLogo = ({ uri = SURF_LOGO, alt = "SURF" }) => {
    return (
        <img
            style={{
                width: "175px",
                height: "59px"
            }}
            src={uri}
            alt={alt}
        />
    );
};

export const MenuHeader = ({ openFlag, onCloseClick }) => (
    <div className="drawer-header">
        <IconButton onClick={() => onCloseClick("close")}>{openFlag ? <ChevronLeft /> : <ChevronRight />}</IconButton>
    </div>
);

export class MenuList extends React.Component {
    state = {
        "Analytics-expand": false
    };
    handleClick = stateKey => {
        this.setState({
            [stateKey]: !this.state[stateKey]
        });
    };
    render = () => {
        const { lists, onItemClick, state, materialKeys } = this.props;
        return (
            <div>
                <List component="nav">
                    {lists.map((item, i) => {
                        const curr = item["material-key"];
                        return item.state === state || (Array.isArray(item.state) && item.state.includes(state)) ? (
                            <PermissionComponent
                                key={item.icon}
                                materialKey={curr && materialKeys[curr]["material-key"]}
                            >
                                {item.subs && Array.isArray(item.subs) ? (
                                    <React.Fragment>
                                        <ListItem button onClick={() => this.handleClick(`${item.id}-expand`)}>
                                            <ListItemIcon>
                                                <Icon>{item.icon}</Icon>
                                            </ListItemIcon>
                                            <ListItemText primary={item.text} />
                                            <ListItemIcon>
                                                {this.state[`${item.id}-expand`] ? (
                                                    <Icon>expand_less</Icon>
                                                ) : (
                                                    <Icon>expand_more</Icon>
                                                )}
                                            </ListItemIcon>
                                        </ListItem>
                                        <Collapse in={this.state[`${item.id}-expand`]} timeout="auto" unmountOnExit>
                                            {item.subs.map(sub => {
                                                return (
                                                    <ListItem
                                                        style={{
                                                            paddingLeft: 80
                                                        }}
                                                        key={sub.icon}
                                                        button
                                                        onClick={() => onItemClick("menuClick", sub)}
                                                    >
                                                        <ListItemIcon>
                                                            <Icon>{sub.icon}</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText primary={sub.text} />
                                                    </ListItem>
                                                );
                                            })}
                                            <Divider />
                                        </Collapse>
                                    </React.Fragment>
                                ) : (
                                    <ListItem button onClick={() => onItemClick("menuClick", item)}>
                                        <ListItemIcon>
                                            <Icon>{item.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                )}
                            </PermissionComponent>
                        ) : null;
                    })}
                </List>
            </div>
        );
    };
}

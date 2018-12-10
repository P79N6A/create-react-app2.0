import token from "./tokenHelper";
import userHelper from "./userHelper";

// import { INITAL_STATE } from "modules/navbar/funcs/constants";
// const { menuList = [] } = INITAL_STATE;
// const permissionKey = menuList.map(n => n["material-key"]);

export default function checkPermission(permissionKey, mk, materialKeys) {
    let masterKey = materialKeys["ACCOUNTS_PAGE"]["material-key"];
    let normalKey = materialKeys["DASHBOARD_LIBRARY_MGMT_PAGE"]["material-key"];
    if (permissionKey.includes(mk)) {
        return null;
    } else if (permissionKey.includes(masterKey)) {
        return { path: "/account" };
    } else if (permissionKey.includes(normalKey)) {
        return { path: "/" };
    } else {
        userHelper.remove();
        token.remove();
        return { path: "/login" };
    }
}

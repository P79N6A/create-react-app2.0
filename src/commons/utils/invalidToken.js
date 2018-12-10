import token from "./tokenHelper";
import userHelper from "./userHelper";
import store from "../store";
import { actions } from "modules/auth";
export default function invalidToken() {
    // let userinfo = JSON.parse(sessionStorage.getItem("ISC-CURRENT-USER")) || {};
    // let logininfo = JSON.parse(sessionStorage.getItem("ISC-GUI-LOGIN-INFO")) || {};
    // const { userid, accountid } = userinfo;
    // if (userid && accountid && logininfo.password) {
    //     store.dispatch(actions.loginRequest(userid, logininfo.password, accountid));
    // } else {
    //     userHelper.remove();
    //     token.remove();
    //     store.dispatch(actions.updateIdentify(false));
    // }
    userHelper.remove();
    token.remove();
    if (store && store.dispatch) {
        store.dispatch(actions.updateIdentify(false));
    }
}

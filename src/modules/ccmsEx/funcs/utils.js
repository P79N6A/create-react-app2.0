export const checkBrowser = () => {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Trident") > -1) {
        return "IE";
    } else if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    } else {
        return "Other";
    }
};

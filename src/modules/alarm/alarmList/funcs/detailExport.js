function getBlob(base64) {
    var contentType = "application/octet-stream";
    return b64toBlob(getData(base64), contentType);
}
function getData(base64) {
    return base64.substr(base64.indexOf("base64,") + 7, base64.length);
}
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}
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
export const downloadFile = (fileName, data) => {
    var content = "data:application/octet-stream;charset=utf-8;base64," + data;
    var blob = getBlob(content);
    window.navigator.msSaveBlob(blob, fileName);
};

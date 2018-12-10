const ascii2hex = function(str) {
    var arr = [];
    for (var n = 0, len = str.length; n < len; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr.push((hex.length > 1 && hex) || "0" + hex);
    }
    return arr.join("");
};
const hex2ascii = function(hexx) {
    var hex = hexx.toString();
    var str = "";
    for (var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
};

export default {
    ascii2hex,
    hex2ascii
};

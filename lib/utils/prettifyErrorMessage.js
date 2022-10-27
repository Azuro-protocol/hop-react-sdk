export var prettifyErrorMessage = function (str) {
    if (str === void 0) { str = ''; }
    if (!str) {
        return '';
    }
    return str.replace(/.*\[ethjs-query\].*"message":"(.*)"\}.*/, '$1');
};

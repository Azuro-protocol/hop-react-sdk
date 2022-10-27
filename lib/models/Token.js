var Token = /** @class */ (function () {
    function Token(props) {
        this.addresses = {};
        this.supportedNetworks = [];
        this.symbol = props.symbol;
        this.tokenName = props.tokenName;
        this.imageUrl = props.imageUrl;
        this.decimals = props.decimals || 18;
        this.supportedNetworks = props.supportedNetworks || [];
    }
    Token.prototype.networkSymbol = function (network) {
        var prefix = (network === null || network === void 0 ? void 0 : network.slug) || '';
        return prefix + '.' + this.symbol;
    };
    Token.prototype.eq = function (otherToken) {
        return otherToken.symbol === this.symbol;
    };
    return Token;
}());
export default Token;

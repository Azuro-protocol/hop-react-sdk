class Token {
    constructor(props) {
        this.addresses = {};
        this.supportedNetworks = [];
        this.symbol = props.symbol;
        this.tokenName = props.tokenName;
        this.imageUrl = props.imageUrl;
        this.decimals = props.decimals || 18;
        this.supportedNetworks = props.supportedNetworks || [];
    }
    networkSymbol(network) {
        const prefix = network?.slug || '';
        return prefix + '.' + this.symbol;
    }
    eq(otherToken) {
        return otherToken.symbol === this.symbol;
    }
}
export default Token;

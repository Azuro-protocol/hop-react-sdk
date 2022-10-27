// import * as ethers from 'ethers'
// import { getProvider } from 'src/utils'
var Network = /** @class */ (function () {
    function Network(props) {
        this.name = props.name;
        this.slug = props.slug;
        this.imageUrl = props.imageUrl;
        this.rpcUrl = props.rpcUrl;
        // TODO: if needed, get provider from signer
        // this.provider = getProvider(props.rpcUrl)
        this.networkId = props.networkId;
        this.chainId = props.networkId;
        this.nativeTokenSymbol = props.nativeTokenSymbol;
        this.isLayer1 = props.isLayer1 ? props.isLayer1 : false;
        this.isL1 = this.isLayer1;
        this.nativeBridgeUrl = props.nativeBridgeUrl;
        this.waitConfirmations = props.waitConfirmations;
        this.explorerUrl = props.explorerUrl;
    }
    Network.prototype.toString = function () {
        return this.name;
    };
    Network.prototype.eq = function (otherNetwork) {
        return otherNetwork.networkId === this.networkId;
    };
    return Network;
}());
export default Network;

// import * as ethers from 'ethers'
// import { getProvider } from 'src/utils'
export default class Network {
    constructor(props) {
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
    toString() {
        return this.name;
    }
    eq(otherNetwork) {
        return otherNetwork.networkId === this.networkId;
    }
}

import { mainnet as mainnetNetworks } from '@hop-protocol/core/networks';
import { arrayOfAll } from '../types/utils';
var chainIsLayer1 = {
    ethereum: true,
    gnosis: false,
    arbitrum: false,
    optimism: false,
    polygon: false,
};
var arrayOfAllChainNames = arrayOfAll();
export var bridgeChainNames = arrayOfAllChainNames([
    'ethereum',
    'gnosis',
    'arbitrum',
    'optimism',
    'polygon',
]);
export var bridgeChainNameId = {
    ethereum: 1,
    optimism: 10,
    arbitrum: 42161,
    polygon: 137,
    gnosis: 100,
};
export var bridgeChains = bridgeChainNames.reduce(function (acc, name) {
    var chainInfo = mainnetNetworks[name];
    if (!chainInfo) {
        throw new Error("Network ".concat(name, " has no configuration"));
    }
    acc[name] = {
        name: chainInfo.name,
        slug: chainInfo.name.toLowerCase(),
        chainId: chainInfo.networkId,
        publicRpcUrl: chainInfo.publicRpcUrl,
        explorerUrls: chainInfo.explorerUrls,
        nativeBridgeUrl: chainInfo.nativeBridgeUrl,
        waitConfirmations: chainInfo.waitConfirmations,
        isLayer1: chainIsLayer1[name],
    };
    return acc;
}, {});

import { mainnet as mainnetNetworks } from '@hop-protocol/core/networks';
import { arrayOfAll } from '../types/utils';
const chainIsLayer1 = {
    ethereum: true,
    gnosis: false,
    arbitrum: false,
    optimism: false,
    polygon: false,
};
const arrayOfAllChainNames = arrayOfAll();
export const bridgeChainNames = arrayOfAllChainNames([
    'ethereum',
    'gnosis',
    'arbitrum',
    'optimism',
    'polygon',
]);
export const bridgeChainNameId = {
    ethereum: 1,
    optimism: 10,
    arbitrum: 42161,
    polygon: 137,
    gnosis: 100,
};
export const bridgeChains = bridgeChainNames.reduce((acc, name) => {
    const chainInfo = mainnetNetworks[name];
    if (!chainInfo) {
        throw new Error(`Network ${name} has no configuration`);
    }
    acc[name] = {
        name: chainInfo.name,
        slug: chainInfo.name.toLowerCase(),
        chainId: chainInfo.networkId,
        publicRpcUrl: chainInfo.publicRpcUrl,
        explorerUrls: chainInfo.explorerUrls,
        nativeBridgeUrl: chainInfo.nativeBridgeUrl,
        isLayer1: chainIsLayer1[name],
    };
    return acc;
}, {});

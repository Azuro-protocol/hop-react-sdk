import { Slug } from '@hop-protocol/sdk';
export declare type BridgeChainName = Extract<`${Slug}`, 'ethereum' | 'gnosis' | 'arbitrum' | 'optimism' | 'polygon'>;
export declare const bridgeChainNames: ("polygon" | "ethereum" | "gnosis" | "arbitrum" | "optimism")[];
export declare const bridgeChainNameId: Record<BridgeChainName, number>;
declare type ChainInfo = {
    name: string;
    slug: string;
    chainId: number;
    publicRpcUrl: string | undefined;
    explorerUrls: string[];
    nativeBridgeUrl: string | undefined;
    waitConfirmations: number;
    isLayer1: boolean;
};
export declare const bridgeChains: Record<BridgeChainName, ChainInfo>;
export {};

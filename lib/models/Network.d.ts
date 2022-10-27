export declare type NetworkProps = {
    name: string;
    slug: string;
    imageUrl: string;
    rpcUrl: string;
    networkId: number;
    chainId?: number;
    nativeTokenSymbol: string;
    isLayer1?: boolean;
    isL1?: boolean;
    nativeBridgeUrl?: string;
    waitConfirmations?: number;
    explorerUrl: string;
};
export default class Network {
    readonly name: string;
    readonly slug: string;
    readonly imageUrl: string;
    readonly rpcUrl: string;
    readonly networkId: number;
    readonly chainId: number;
    readonly nativeTokenSymbol: string;
    readonly isLayer1: boolean;
    readonly isL1: boolean;
    readonly nativeBridgeUrl: string | undefined;
    readonly waitConfirmations?: number;
    readonly explorerUrl: string;
    constructor(props: NetworkProps);
    toString(): string;
    eq(otherNetwork: Network): boolean;
}
export declare type Networkish = Network | string | undefined;

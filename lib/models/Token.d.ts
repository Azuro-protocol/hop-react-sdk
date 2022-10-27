import Network from './Network';
import Address from './Address';
import { TokenSymbol } from '@hop-protocol/sdk';
declare type TokenProps = {
    symbol: TokenSymbol;
    tokenName: string;
    imageUrl: string;
    decimals?: number;
    supportedNetworks?: string[];
};
declare class Token {
    readonly symbol: TokenSymbol;
    readonly tokenName: string;
    readonly decimals: number;
    readonly imageUrl: string;
    readonly addresses: {
        [key: string]: Address;
    };
    readonly supportedNetworks: string[];
    constructor(props: TokenProps);
    networkSymbol(network: Network | undefined): string;
    eq(otherToken: Token): boolean;
}
export default Token;

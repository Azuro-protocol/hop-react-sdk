import { mainnet as mainnetAddresses } from '@hop-protocol/core/addresses';
import { mainnet as mainnetMetadata } from '@hop-protocol/core/metadata';
import TokenModel from '../models/Token';
import { arrayOfAll } from '../types/utils';
var arrayOfAllBridgedSymbol = arrayOfAll();
export var bridgeSymbols = arrayOfAllBridgedSymbol(['ETH', 'MATIC', 'USDC', 'USDT', 'DAI']);
export var bridgeTokens = bridgeSymbols.reduce(function (acc, symbol) {
    var tokenInfo = mainnetMetadata.tokens[symbol];
    if (!tokenInfo) {
        throw new Error("Token ".concat(symbol, " has no configuration"));
    }
    acc[symbol] = new TokenModel({
        symbol: symbol,
        tokenName: tokenInfo.name,
        decimals: tokenInfo.decimals,
        imageUrl: '',
        supportedNetworks: Object.keys(mainnetAddresses.bridges[symbol]),
    });
    return acc;
}, {});

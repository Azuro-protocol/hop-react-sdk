import { CanonicalToken } from '@hop-protocol/sdk';
import TokenModel from '../models/Token';
declare type AllBridge = `${CanonicalToken}`;
export declare type BridgeSymbol = Extract<AllBridge, 'ETH' | 'MATIC' | 'USDC' | 'USDT' | 'DAI'>;
export declare const bridgeSymbols: ("ETH" | "MATIC" | "USDC" | "USDT" | "DAI")[];
export declare const bridgeTokens: Record<BridgeSymbol, TokenModel>;
export {};

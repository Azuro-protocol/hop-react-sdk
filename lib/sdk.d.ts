import { BigNumber } from '@ethersproject/bignumber';
import { JsonRpcProvider, TransactionResponse, JsonRpcSigner } from '@ethersproject/providers';
import { Token as SdkHopToken, ChainId as AllChainId } from '@hop-protocol/sdk';
import { BridgeSymbol } from './config/bridge';
import { BridgeChainName } from './config/chian';
import { CalculateSendResponse } from './utils/calculateSend';
export declare type ChainId = `${AllChainId}`;
declare type useHopBridgeProps = {
    provider: JsonRpcProvider;
};
declare type BridgeSendParams = {
    token: BridgeSymbol;
    fromChainName: BridgeChainName;
    toChainName: BridgeChainName;
    tokenAmount: BigNumber;
    toAddress: string;
    slippageTolerance: number;
};
export declare type UseHopBridgeFunctionResponse = {
    tokenDecimals: number;
    estimation: CalculateSendResponse;
    isApprovalNeeded: boolean;
    sendApproval: () => Promise<TransactionResponse>;
    sendSwap: () => Promise<{
        tx?: TransactionResponse;
        hopExplorerLink?: string;
        error?: any;
        formattedMessage?: string;
    }>;
};
export declare function getHopToken(signer: JsonRpcSigner, tokenName: BridgeSymbol, chainName: BridgeChainName): SdkHopToken;
export declare function useHopBridge({ provider }: useHopBridgeProps): ({ token: tokenName, tokenAmount, fromChainName, toChainName, toAddress: toAddressRaw, slippageTolerance, }: BridgeSendParams) => Promise<UseHopBridgeFunctionResponse>;
export {};

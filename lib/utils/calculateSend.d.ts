import { BigNumber } from '@ethersproject/bignumber';
import { HopBridge } from '@hop-protocol/sdk';
import { BridgeChainName } from '../config/chian';
export declare type CalculateSendResponse = {
    amountOut: BigNumber;
    rate: number;
    priceImpact: number;
    requiredLiquidity: BigNumber;
    lpFees: BigNumber;
    adjustedBonderFee: BigNumber;
    adjustedDestinationTxFee: BigNumber;
    totalFee: BigNumber;
    estimatedReceived: BigNumber;
    amountOutMin: BigNumber;
    intermediaryAmountOutMin: BigNumber;
};
declare function calculateSend(hopBridge: HopBridge, fromChainName: BridgeChainName, toChainName: BridgeChainName, amount: BigNumber, slippageTolerance: number): Promise<CalculateSendResponse>;
export default calculateSend;

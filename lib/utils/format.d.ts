import { BigNumber } from '@ethersproject/bignumber';
import Network from '../models/Network';
export declare function formatError(error: any, network?: Network): string | undefined;
export declare function sanitizeNumericalString(numStr: string): string;
export declare function maxDecimals(amount: string, decimals: number): string;
export declare function fixedDecimals(amount: string, decimals?: number): string;
export declare function amountToBN(amount: string | number, decimals?: number): BigNumber;

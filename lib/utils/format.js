import { BigNumber, FixedNumber } from '@ethersproject/bignumber';
import { utils } from 'ethers';
import { prettifyErrorMessage } from './prettifyErrorMessage';
export function formatError(error, network) {
    if (!error) {
        return;
    }
    let errMsg = 'Something went wrong. Please try again.';
    if (typeof error === 'string') {
        errMsg = error;
    }
    else if (error?.data?.message) {
        errMsg = error.data.message;
    }
    else if (error?.message) {
        errMsg = error.message;
    }
    if (Array.isArray(error) && error.length === 1) {
        return formatError(error[0], network);
    }
    // TODO: handle custom error messages elsewhere (and better)
    if (errMsg.includes('not enough funds for gas') ||
        errMsg.includes('insufficient funds') ||
        errMsg.includes('Insufficient funds')) {
        const feeToken = network?.nativeTokenSymbol || 'funds';
        errMsg = `Insufficient balance. Please add ${feeToken} to pay for tx fees. Error: ${errMsg}`;
    }
    else if (errMsg.includes('NetworkError when attempting to fetch resource')) {
        errMsg = `${errMsg} Please check your wallet network settings are correct and try again. More info: https://docs.hop.exchange/rpc-endpoints`;
    }
    else if (errMsg.includes('[ethjs-query]') ||
        errMsg.includes('while formatting outputs from RPC')) {
        errMsg = `An RPC error occured. Please check your wallet network settings are correct and refresh page to try again. More info: https://docs.hop.exchange/rpc-endpoints. Error: ${errMsg}`;
    }
    else if (errMsg.includes('Failed to fetch') ||
        errMsg.includes('could not detect network') ||
        errMsg.includes('Not Found') ||
        errMsg.includes('Non-200 status code')) {
        errMsg = `There was a network error. Please disable any ad blockers and check your wallet network settings are correct and refresh page to try again. More info: https://docs.hop.exchange/rpc-endpoints. Error: ${errMsg}`;
    }
    else if (errMsg.includes('Internal JSON-RPC error') ||
        errMsg.includes('Internal error')) {
        const feeToken = network?.nativeTokenSymbol || 'funds';
        errMsg = `An RPC error occured. Please check you have enough ${feeToken} to pay for fees and check your wallet network settings are correct. Refresh to try again. More info: https://docs.hop.exchange/rpc-endpoints. Error: ${errMsg}`;
    }
    else if (errMsg.includes('call revert exception') ||
        errMsg.includes('missing revert data')) {
        errMsg = `An RPC error occured. Please check your wallet network settings are correct and refresh page to try again. More info: https://docs.hop.exchange/rpc-endpoints. Error: ${errMsg}`;
    }
    else if (errMsg.includes('unsupported block number') ||
        errMsg.includes('rlp: expected List')) {
        errMsg = `An RPC error occured. Please refresh page to try again. Error: ${errMsg}`;
    }
    else if (errMsg.includes('transaction underpriced')) {
        errMsg = `An RPC error occured. The transaction is underpriced. Please try again and increase gas price. If you are seeing is error a lot, try resetting the nonce for your wallet account. Error: ${errMsg}`;
    }
    return prettifyErrorMessage(errMsg);
}
export function sanitizeNumericalString(numStr) {
    return numStr.replace(/[^0-9.]|\.(?=.*\.)/g, '');
}
export function maxDecimals(amount, decimals) {
    const sanitizedAmount = sanitizeNumericalString(amount);
    const indexOfDecimal = sanitizedAmount.indexOf('.');
    if (indexOfDecimal === -1) {
        return sanitizedAmount;
    }
    const wholeAmountStr = sanitizedAmount.slice(0, indexOfDecimal) || '0';
    const wholeAmount = BigNumber.from(wholeAmountStr).toString();
    const fractionalAmount = sanitizedAmount.slice(indexOfDecimal + 1);
    const decimalAmount = decimals !== 0 ? `.${fractionalAmount.slice(0, decimals)}` : '';
    return `${wholeAmount}${decimalAmount}`;
}
export function fixedDecimals(amount, decimals = 18) {
    if (amount === '') {
        return amount;
    }
    const mdAmount = maxDecimals(amount, decimals);
    return FixedNumber.from(mdAmount).toString();
}
export function amountToBN(amount, decimals = 18) {
    const fixedAmount = fixedDecimals(amount.toString(), decimals);
    return utils.parseUnits(fixedAmount || '0', decimals);
}

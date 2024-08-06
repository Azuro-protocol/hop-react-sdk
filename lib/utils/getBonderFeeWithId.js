import { BigNumber } from '@ethersproject/bignumber';
export function getBonderFeeWithId(bonderFee, modifyAmount = '123') {
    const modifyAmountLength = modifyAmount.length;
    if (bonderFee.toString().length <= modifyAmountLength) {
        return bonderFee;
    }
    const feeStr = bonderFee.toString();
    const modifiedFee = feeStr.substring(0, feeStr.length - modifyAmountLength) + modifyAmount;
    return BigNumber.from(modifiedFee);
}

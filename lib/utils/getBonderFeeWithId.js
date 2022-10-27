import { BigNumber } from '@ethersproject/bignumber';
export function getBonderFeeWithId(bonderFee, modifyAmount) {
    if (modifyAmount === void 0) { modifyAmount = '123'; }
    var modifyAmountLength = modifyAmount.length;
    if (bonderFee.toString().length <= modifyAmountLength) {
        return bonderFee;
    }
    var feeStr = bonderFee.toString();
    var modifiedFee = feeStr.substring(0, feeStr.length - modifyAmountLength) + modifyAmount;
    return BigNumber.from(modifiedFee);
}

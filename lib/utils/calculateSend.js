async function calculateSend(hopBridge, fromChainName, toChainName, amount, slippageTolerance) {
    const data = await hopBridge.getSendData(amount, fromChainName, toChainName, false);
    const slippageToleranceBps = slippageTolerance * 100;
    const minBps = Math.ceil(10000 - slippageToleranceBps);
    const amountOutMin = data.amountOut.mul(minBps).div(10000);
    const intermediaryAmountOutMin = data.requiredLiquidity.mul(minBps).div(10000);
    return {
        ...data,
        amountOutMin,
        intermediaryAmountOutMin,
    };
}
export default calculateSend;

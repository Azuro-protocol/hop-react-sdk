var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useCallback } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { getAddress } from '@ethersproject/address';
import { Token as SdkHopToken, Hop } from '@hop-protocol/sdk';
import { mainnet as mainnetAddresses } from '@hop-protocol/core/addresses';
import { formatError } from './utils/format';
import { getBonderFeeWithId } from './utils/getBonderFeeWithId';
import { bridgeTokens } from './config/bridge';
import { bridgeChains } from './config/chian';
import calculateSend from './utils/calculateSend';
var defaultDeadlineMinutes = 60 * 24 * 7;
var hopExplorerUrl = 'https://explorer.hop.exchange/?transferId=';
export function getHopToken(signer, tokenName, chainName) {
    var _a;
    var token = bridgeTokens[tokenName];
    var tokenBridge = mainnetAddresses.bridges[tokenName][chainName];
    var tokenAddress = ((_a = tokenBridge.l1CanonicalToken) !== null && _a !== void 0 ? _a : tokenBridge.l2CanonicalToken);
    return new SdkHopToken('mainnet', chainName, tokenAddress, token.decimals, token.symbol, token.symbol, '', signer);
}
export function useHopBridge(_a) {
    var _this = this;
    var provider = _a.provider;
    return useCallback(function (_a) {
        var tokenName = _a.token, tokenAmount = _a.tokenAmount, fromChainName = _a.fromChainName, toChainName = _a.toChainName, toAddressRaw = _a.toAddress, slippageTolerance = _a.slippageTolerance;
        return __awaiter(_this, void 0, void 0, function () {
            var signer, chainFrom, chainTo, token, amountBN, toAddress, providerChainId, sdk, hopBridge, estimation, error_1, isApprovalNeeded;
            var _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        signer = provider.getSigner();
                        chainFrom = bridgeChains[fromChainName];
                        chainTo = bridgeChains[toChainName];
                        token = bridgeTokens[tokenName];
                        amountBN = tokenAmount;
                        toAddress = toAddressRaw.toLowerCase();
                        // verify signer
                        if (!signer) {
                            throw new Error('Cannot send: the provider passed as argument does not have a valid signer.');
                        }
                        return [4 /*yield*/, provider.getNetwork()];
                    case 1:
                        providerChainId = (_c.sent()).chainId;
                        if (chainFrom.chainId !== providerChainId) {
                            throw new Error('Provider chainId does not match toNetwork chainId');
                        }
                        // verify to address
                        try {
                            getAddress(toAddress);
                        }
                        catch (err) {
                            throw new Error('toAddress is now a valid address');
                        }
                        // verify slippage
                        if (slippageTolerance < 0) {
                            throw new Error('slippageTolerance must be greater or equal than 0');
                        }
                        sdk = new Hop('mainnet', signer);
                        hopBridge = sdk.bridge(tokenName).connect(signer);
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, calculateSend(hopBridge, fromChainName, toChainName, amountBN, slippageTolerance)];
                    case 3:
                        estimation = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        console.error('Error calculating swap stats', error_1);
                        throw Error(__assign(__assign({}, error_1), { customMessage: 'There was a problem trying to estimate the swap.' }));
                    case 5:
                        // verify amount > fee
                        if (estimation.totalFee.gt(amountBN)) {
                            throw new Error('Amount must be greater than bonder fee');
                        }
                        isApprovalNeeded = function () { return __awaiter(_this, void 0, void 0, function () {
                            var hopSdkToken, currentAllowance;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        hopSdkToken = getHopToken(signer, tokenName, fromChainName);
                                        if (hopSdkToken.isNativeToken) {
                                            return [2 /*return*/, false];
                                        }
                                        return [4 /*yield*/, hopSdkToken.allowance(hopBridge.getSendApprovalAddress(fromChainName, false))];
                                    case 1:
                                        currentAllowance = _a.sent();
                                        return [2 /*return*/, amountBN.gt(currentAllowance)];
                                }
                            });
                        }); };
                        _b = {
                            tokenDecimals: token.decimals,
                            estimation: estimation
                        };
                        return [4 /*yield*/, isApprovalNeeded()];
                    case 6: return [2 /*return*/, (_b.isApprovalNeeded = _c.sent(),
                            _b.sendApproval = function () { return hopBridge.sendApproval(amountBN, fromChainName, toChainName); },
                            _b.sendSwap = function (_a) {
                                var _b = _a === void 0 ? {} : _a, onConfirm = _b.onConfirm;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var deadline, tx, receipt, bonderFeeWithId, tx, receipt, hopExplorerLink, bonderFeeWithId, tx, receipt, error_2;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                deadline = Math.ceil(Date.now() / 1000 + Number(defaultDeadlineMinutes) * 60);
                                                _c.label = 1;
                                            case 1:
                                                _c.trys.push([1, 11, , 12]);
                                                if (!chainFrom.isLayer1) return [3 /*break*/, 4];
                                                return [4 /*yield*/, hopBridge.send(amountBN, sdk.Chain.Ethereum, toChainName, {
                                                        deadline: deadline,
                                                        relayer: AddressZero,
                                                        relayerFee: 0,
                                                        recipient: toAddress,
                                                        amountOutMin: estimation.amountOutMin,
                                                    })];
                                            case 2:
                                                tx = _c.sent();
                                                if (onConfirm) {
                                                    onConfirm(tx);
                                                }
                                                return [4 /*yield*/, tx.wait()];
                                            case 3:
                                                receipt = _c.sent();
                                                return [2 /*return*/, {
                                                        tx: tx,
                                                        hopExplorerLink: "".concat(hopExplorerUrl).concat(receipt.transactionHash),
                                                    }];
                                            case 4:
                                                if (!chainTo.isLayer1) return [3 /*break*/, 7];
                                                bonderFeeWithId = getBonderFeeWithId(estimation.totalFee);
                                                return [4 /*yield*/, hopBridge.send(amountBN, fromChainName, toChainName, {
                                                        deadline: deadline,
                                                        recipient: toAddress,
                                                        bonderFee: bonderFeeWithId,
                                                        amountOutMin: estimation.amountOutMin.sub(bonderFeeWithId),
                                                        destinationAmountOutMin: 0,
                                                        destinationDeadline: 0,
                                                    })];
                                            case 5:
                                                tx = _c.sent();
                                                if (onConfirm) {
                                                    onConfirm(tx);
                                                }
                                                return [4 /*yield*/, tx.wait()];
                                            case 6:
                                                receipt = _c.sent();
                                                hopExplorerLink = "".concat(hopExplorerUrl).concat(receipt.transactionHash);
                                                return [2 /*return*/, {
                                                        tx: tx,
                                                        hopExplorerLink: hopExplorerLink,
                                                    }];
                                            case 7:
                                                bonderFeeWithId = getBonderFeeWithId(estimation.totalFee);
                                                return [4 /*yield*/, hopBridge.send(amountBN, fromChainName, toChainName, {
                                                        recipient: toAddress,
                                                        bonderFee: bonderFeeWithId,
                                                        amountOutMin: estimation.intermediaryAmountOutMin.sub(bonderFeeWithId),
                                                        deadline: deadline,
                                                        destinationAmountOutMin: estimation.amountOutMin.sub(bonderFeeWithId),
                                                        destinationDeadline: deadline,
                                                    })];
                                            case 8:
                                                tx = _c.sent();
                                                if (onConfirm) {
                                                    onConfirm(tx);
                                                }
                                                return [4 /*yield*/, tx.wait()];
                                            case 9:
                                                receipt = _c.sent();
                                                return [2 /*return*/, {
                                                        tx: tx,
                                                        hopExplorerLink: "".concat(hopExplorerUrl).concat(receipt.transactionHash),
                                                    }];
                                            case 10: return [3 /*break*/, 12];
                                            case 11:
                                                error_2 = _c.sent();
                                                return [2 /*return*/, {
                                                        formattedMessage: !/cancelled/gi.test(error_2.message)
                                                            ? formatError(error_2)
                                                            : 'Transaction cancelled',
                                                        error: error_2,
                                                    }];
                                            case 12: return [2 /*return*/];
                                        }
                                    });
                                });
                            },
                            _b)];
                }
            });
        });
    }, [provider]);
}

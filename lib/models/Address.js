import { getAddress, isAddress } from '@ethersproject/address';
var Address = /** @class */ (function () {
    function Address(address) {
        var _address;
        if (address instanceof Address) {
            _address = address.toString();
        }
        else if (typeof address === 'string') {
            _address = getAddress(address);
        }
        if (!_address || !isAddress(_address)) {
            throw new Error('Invalid address');
        }
        this.address = _address;
    }
    Address.from = function (address) {
        return new Address(address);
    };
    Address.prototype.toString = function () {
        return this.address;
    };
    Address.prototype.truncate = function () {
        return this.address.slice(0, 6) + '...' + this.address.slice(38, 42);
    };
    Address.prototype.toLowercase = function () {
        return this.address.toLowerCase();
    };
    Address.prototype.eq = function (address) {
        if (address && isAddress(address === null || address === void 0 ? void 0 : address.toString())) {
            return new Address(address).toLowercase() === this.toLowercase();
        }
        return false;
    };
    return Address;
}());
export default Address;
